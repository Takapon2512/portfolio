import { Router, Request, Response } from "express";
import multer, { Multer, StorageEngine, diskStorage } from "multer";
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
}

interface UserInfoType extends LoginType {
    id: number;
    created_at: Date;
    deleted_at: Date | null;
}

export const usersRouter: Router = Router();
const prisma: PrismaClient = new PrismaClient();

const storage: StorageEngine = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload: Multer = multer({ storage });

//ユーザーを検索するAPI
usersRouter.get("/find", isAuthenticated, async (req: Request, res: Response) => {
    try {
        const user: UserInfoType | null = await prisma.user.findUnique({ where: { id: req.body.user_id } });

        if (!user) res.status(NotFound).json({ message: "ユーザーが見つかりませんでした。" });

        return res.status(OK).json({ user: { id: user?.id, email: user?.email, username: user?.username } });
    } catch (err) {
        return res.status(ServerError).json({ message: "サーバーエラーです。" });
    }
});

//現在の設定を取得するAPI
usersRouter.get("/find_setting", isAuthenticated, async (req: Request, res: Response) => {
    try {
        const userSetting = await prisma.setting.findUnique({ where: { user_id: req.body.user_id } });

        if (!userSetting) res.status(NotFound).json({ message: "設定情報が見つかりませんでした。" });

        return res.status(OK).json(userSetting);
    } catch (err) {
        return res.status(ServerError).json({ message: "サーバーエラーです。" });
    }
});

//プロフィールをアップロードするAPI
usersRouter.post("/profile_upload", [upload.single("profile_icon"), isAuthenticated], async (req: Request, res: Response) => {

    try {
        const user: UserInfoType | null = await prisma.user.findUnique({ where: { id: req.body.user_id } });
        if (!user) return res.status(NotFound).json({ message: "ユーザーが見つかりませんでした。" });

        const uploadUrl = await prisma.setting.update({
            where: { user_id: req.body.user_id },
            data: { icon_url: req.file?.originalname }
        });

        return res.status(OK).json({uploadUrl});
        
    } catch (err) {
        console.error(err);
        return res.status(ServerError).json({ error: serverErrorMsg });
    };
});

//ユーザー情報をDBにアップロードするAPI
usersRouter.post("/user_upload", isAuthenticated, async (req: Request, res: Response) => {
    const { name, email, currentPassword, newPassWord, confirmPassword } = req.body;

    //新しいユーザー名があるときの処理
    if (name !== "") {
        await prisma.user.update({
            where: { id: req.body.user_id },
            data: { username: name }
        });
    };

    //新しいメールアドレスがあるときの処理
    if (email !== "") {
        const responseFindEmail = await prisma.user.findUnique({ where: { email: email } });
        if (responseFindEmail) return res.status(ServerError).json({ error: "登録に失敗しました。" });

        await prisma.user.update({
            where: { id: req.body.user_id },
            data: { email: email }
        });
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

//設定情報を取得する
usersRouter.get("/setting_find", isAuthenticated, async (req: Request, res: Response) => {
    const settingData = await prisma.setting.findUnique({ where: { id: req.body.user_id } });
    if (!settingData) return res.status(ServerError).json({ error: "設定情報を取得できませんでした。" });

    return res.status(OK).json(settingData);
});