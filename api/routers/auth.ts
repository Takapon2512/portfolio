import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

//type
import { LoginType, UserType } from '../types/ApiTypes';

//utils
import { Unauthorized, ServerError } from '../utils/StatusCode';

export const authRouter: Router = Router();
const prisma: PrismaClient = new PrismaClient();

//新規ユーザー登録API
authRouter.post("/register", async (req: Request, res: Response) => {
    const { name, email, password }: LoginType = req.body;

    //入力されたパスワードをハッシュ化する
    const hashedPassword: string = await hash(password, 10);

    //DBに同じメールアドレスのユーザーが存在するかどうかを確認
    const sameUser: UserType | null = await prisma.user.findUnique({ where: { email: email } });
    if (sameUser) {
        return res.status(ServerError).json({ error: "すでに同じメールアドレスのユーザーが存在します。" });
    };

    const user: UserType = await prisma.user.create({
        data: {
            username: name,
            email: email,
            password: hashedPassword
        }
    });

    //ユーザー登録時に初期設定を行う
    await prisma.setting.create({
        data: {
            work_on_count: 100,
            time_constraint: 10,
            icon_url: "/images/noImage.png",
            user_id: user.id,
        }
    });

    //クライアントへJWTの発行
    const token: string = sign({ id: user.id }, process.env.SECRET_KEY || "", { expiresIn: "3h" });

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
    const token: string = sign({ id: user.id }, process.env.SECRET_KEY || "", { expiresIn: "3h" });

    return res.json({ token: token });
});