import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { isAuthenticated } from "../middleware/isAuthenticated";

//utils
import { NotFound, OK, ServerError } from "../utils/StatusCode";

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

usersRouter.get("/find", isAuthenticated, async (req: Request, res: Response) => {
    try {
        const user: UserInfoType | null = await prisma.user.findUnique({ where: { id: req.body.user_id } });

        if (!user) res.status(NotFound).json({ message: "ユーザーが見つかりませんでした。" });

        return res.status(OK).json({ user: { id: user?.id, email: user?.email, username: user?.username } });
    } catch (err) {
        return res.status(ServerError).json({ message: "サーバーエラーです。" });
    }
});
