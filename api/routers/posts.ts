import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

//type
import { LoginType, UserType, WordDataType } from '../types/ApiTypes';

//utils
import { Unauthorized, ServerError, Created, OK } from '../utils/StatusCode';
import { serverErrorMsg } from "../utils/message";

export const postsRouter: Router = Router();
const prisma: PrismaClient = new PrismaClient();

//単語をDBに登録するAPI
postsRouter.post("/db_register", async (req: Request, res: Response) => {
    const WordsArr: WordDataType[] = req.body;

    try {
        const newRegisterWords = await prisma.wordData.createMany({
            data: WordsArr
        });

        return res.status(Created).json(newRegisterWords);
    } catch (err) {
        console.error(err);
        return res.status(ServerError).json({ error: serverErrorMsg });
    };
});

//DBの単語を取得するAPI
postsRouter.get("/db_search", async (req: Request, res: Response) => {
    const words: WordDataType[] = await prisma.wordData.findMany({ where: { user_id: 1 } });

    if (!words) {
        return res.status(ServerError).json({ error: serverErrorMsg });
    };

    return res.status(OK).json(words);
});