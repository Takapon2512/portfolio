import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";

//type
import { LoginType, UserType } from '../types/ApiTypes';

//utils
import { Unauthorized, ServerError, OK, NotFound } from '../utils/StatusCode';

export const authRouter: Router = Router();
const prisma: PrismaClient = new PrismaClient();

//新規ユーザー登録API
authRouter.post("/register", async (req: Request, res: Response) => {
    const { name, email, password }: LoginType = req.body;

    //DBに同じメールアドレスのユーザーが存在するかどうかを確認
    const sameUser: UserType | null = await prisma.user.findUnique({ where: { email: email, deleted_at: null } });
    if (sameUser) {
        return res.status(ServerError).json({ error: "すでに同じメールアドレスのユーザーが存在します。" });
    };

    const sameEmailUser: UserType | null = await prisma.user.findUnique({
        where: { email: email } 
    });

    //退会したユーザーと同じメールアドレスを持つときの処理
    if (sameEmailUser && sameEmailUser.deleted_at !== null) {        
        //前のユーザーデータを消去する
        await prisma.user.delete({ where: { email: email } });
    };

    //入力されたパスワードをハッシュ化する
    const hashedPassword: string = await hash(password, 10);

    //uuidを生成
    const randomUUID: string = uuidv4();

    const user: UserType = await prisma.user.create({
        data: {
            username: name,
            email: email,
            password: hashedPassword,
            uid: randomUUID
        }
    });

    //ユーザー登録時に初期設定を行う
    await prisma.setting.create({
        data: {
            work_on_count: 100,
            time_constraint: 10,
            icon_url: "/images/noImage.png",
            user_id: randomUUID
        }
    });

    //クライアントへJWTの発行
    const token: string = sign({ user_id: user.uid }, process.env.SECRET_KEY || "", { expiresIn: "3h" });

    return res.json({ user: user, token: token });
});

//ユーザーログインAPI
authRouter.post("/login", async (req: Request, res: Response) => {
    const { name, email, password}: LoginType = req.body;
    const user: UserType | null = await prisma.user.findUnique({ where: { email: email, username: name } });

    //DBにユーザーが存在するかどうかを確認
    if (!user) {
        return res.status(Unauthorized).json({ error: "メールアドレスかパスワードが間違っています。" });
    };

    const isPassWord: boolean = await compare(password, user.password);

    //パスワードに間違いがないかどうかを確認
    if (!isPassWord) {
        return res.status(Unauthorized).json({ error: "そのパスワードは間違っています。" });
    };

    //クライアントへJWTの発行
    const token: string = sign({ user_id: user.uid }, process.env.SECRET_KEY || "", { expiresIn: "3h" });

    return res.json({ user: user, token: token });
});

//パスワードリセット機能
authRouter.post("/reset-password", async (req: Request, res: Response) => {
    //メールアドレスでユーザー検索
    const getEmail: string = req.body.email;
    const user: UserType | null = await prisma.user.findUnique({ where: { email: getEmail } });
    
    if (!user) return res.status(NotFound).json({ error: "そのユーザーは存在しません" });

    const resetToken: string = uuidv4();
    const createDate: Date = new Date();
    const expireDate: Date = new Date(createDate.getTime() + 5 * 60 * 1000);

    //メール送信の処理（Amazon SESを利用）


    try {
        await prisma.user.update({ 
            where: { email: getEmail },
            data: {
                reset_token: resetToken,
                create_token: createDate,
                expire_token: expireDate
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(ServerError).json({ error: "パスワードリセットができませんでした" });
    };

    return res.status(OK).json({ resetToken, createDate, expireDate });
});