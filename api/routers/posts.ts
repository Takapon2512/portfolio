import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

//type
import { LoginType, UserType, WordDataType } from '../types/ApiTypes';

//utils
import { Unauthorized, ServerError, Created } from '../utils/StatusCode';
import { serverErrorMsg } from "../utils/message";

export const postsRouter: Router = Router();
const prisma: PrismaClient = new PrismaClient();

//単語をDBに登録するAPI
postsRouter.post("/db_register", async (req: Request, res: Response) => {
    const { english, japanese }: { english: string, japanese: string } = req.body;

    try {
        const newWord: WordDataType = await prisma.wordData.create({
            data: {
                english: english,
                japanese: japanese,
                user_id: 4
            },
        });

        return res.status(Created).json(newWord);
    } catch (err) {
        console.error(err);
        return res.status(ServerError).json({ error: serverErrorMsg });
    }
});