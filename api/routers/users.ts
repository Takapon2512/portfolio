import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from 'bcrypt';
import { isAuthenticated } from "../middleware/isAuthenticated";

//utils
import { NotFound, OK, ServerError, Unauthorized } from "../utils/StatusCode";
import { serverErrorMsg } from "../utils/message";

//types
interface LoginType {
    email: string;
    username: string;
    password: string;
    uid: string;
}

interface UserInfoType extends LoginType {
    id: number;
    created_at: Date;
    deleted_at: Date | null;
}

export const usersRouter: Router = Router();
const prisma = new PrismaClient();

//ユーザーを検索するAPI
usersRouter.get("/find", isAuthenticated, async (req: Request, res: Response) => {
    try {
        const user: UserInfoType | null = await prisma.user.findUnique({ where: { uid: req.body.user_id } });

        if (!user) res.status(NotFound).json({ message: "ユーザーが見つかりませんでした。" });

        return res.status(OK).json({ user: { id: user?.id, email: user?.email, username: user?.username, uid: user?.uid } });
    } catch (err) {
        return res.status(ServerError).json({ message: serverErrorMsg });
    }
});

//現在の設定を取得するAPI
usersRouter.get("/find_setting", isAuthenticated, async (req: Request, res: Response) => {
    try {
        const userSetting = await prisma.setting.findUnique({ where: { user_id: req.body.user_id } });

        if (!userSetting) res.status(NotFound).json({ message: "設定情報が見つかりませんでした。" });

        return res.status(OK).json(userSetting);
    } catch (err) {
        return res.status(ServerError).json({ message: serverErrorMsg });
    }
});

//ユーザー情報をDBにアップロードするAPI
usersRouter.post("/user_upload", isAuthenticated, async (req: Request, res: Response) => {
    const { name, email, currentPassword, newPassWord, confirmPassword } = req.body;

    //新しいユーザー名があるときの処理
    if (name !== "") {
        try {
            await prisma.user.update({
                where: { id: req.body.user_id },
                data: { username: name }
            });
        } catch (err) {
            console.error(err);
            return res.status(ServerError).json({ message: "変更に失敗しました。" });
        };
    };

    //新しいメールアドレスがあるときの処理
    if (email !== "") {
        const responseFindEmail = await prisma.user.findUnique({ where: { email: email } });
        if (responseFindEmail) return res.status(ServerError).json({ error: "登録に失敗しました。" });

        try {
            await prisma.user.update({
                where: { id: req.body.user_id },
                data: { email: email }
            });
        } catch(err) {
            console.error(err);
            return res.status(ServerError).json({ message: serverErrorMsg })
        };
    };

    //新しいパスワードがあるときの処理
    if (currentPassword !== "" && newPassWord !== "" && confirmPassword !== "") {
        const user: UserInfoType | null = await prisma.user.findUnique({ where: { id: req.body.user_id } });
        if (!user) return res.status(NotFound).json({ message: "ユーザーが見つかりませんでした。" });

        if (newPassWord !== confirmPassword) return res.status(Unauthorized).json({ error: "パスワードが違います。" });

        //現在のパスワードが正しいかを確認
        const isCurrentPasswordValid: boolean = await compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) return res.status(Unauthorized).json({ error: "パスワードが違います。" });

        //新しいパスワードをハッシュ化
        const hashedNewPassword: string = await hash(newPassWord, 10);

        await prisma.user.update({
            where: { id: req.body.user_id },
            data: { password: hashedNewPassword }
        });
    }

    return res.status(OK).json({ message: "正常に反映されました。" });
});

usersRouter.post("/mode_upload", isAuthenticated, async (req: Request, res: Response) => {
    const { num_timeLimit, num_questions }: { num_timeLimit: number, num_questions: number } = req.body;
    //現在の時刻を取得
    const now = new Date(Date.now());

    try {
        await prisma.setting.update({ 
            where: { user_id: req.body.user_id },
            data: { time_constraint: num_timeLimit, work_on_count: num_questions, updated_at: now }
        });
        return res.status(OK).json({ message: "正常に反映されました。" });
    } catch (err) {
        console.error(err);
        return res.status(ServerError).json({ message: "変更に失敗しました。" });
    };
});

//暗記モードで学習した日を記録するAPI
usersRouter.post("/learning_record", isAuthenticated, async (req: Request, res: Response) => {
    //現在の時刻を取得
    const now = new Date(Date.now());

    try {
        const userCalendar = await prisma.calendar.create({
            data: { 
                learning_date: now,
                user_id: req.body.user_id
            }
        });

        return res.status(OK).json(userCalendar);
    } catch(err) {
        console.error(err);
        return res.status(ServerError).json({ error: serverErrorMsg })
    };
});

//暗記モードで学習した日を取得するAPI
usersRouter.get("/get_learning_record", isAuthenticated, async (req: Request, res: Response) => {
    const userCalendars = await prisma.calendar.findMany({ where: { user_id: req.body.user_id }});

    try {
        return res.status(OK).json(userCalendars);
    } catch (err) {
        console.error(err);
        return res.status(ServerError).json({ error: serverErrorMsg });
    };
});

//退会機能
usersRouter.post("/unsubscribe", isAuthenticated, async (req: Request, res: Response) => {
    //現在の時刻を取得
    const now = new Date(Date.now());

    await prisma.user.update({
        where: { uid: req.body.user_id },
        data: { deleted_at: now }
    });

    try {
        return res.status(OK).json({ message: "退会処理が完了しました。" });
    } catch (err) {
        console.error(err);
        return res.status(ServerError).json({ error: serverErrorMsg });
    };
});