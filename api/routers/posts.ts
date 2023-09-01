import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

//type
import { LoginType, UserType, WordDBType } from '../types/ApiTypes';

//utils
import { Unauthorized, ServerError, Created, OK } from '../utils/StatusCode';
import { serverErrorMsg } from "../utils/message";
import { isAuthenticated } from "../middleware/isAuthenticated";

export const postsRouter: Router = Router();
const prisma: PrismaClient = new PrismaClient();

//単語をDBに登録するAPI
postsRouter.post("/db_register", async (req: Request, res: Response) => {
    const WordsArr: Array<WordDBType> = req.body;

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
postsRouter.get("/db_search", isAuthenticated, async (req: Request, res: Response) => {
    try {
        const words: Array<WordDBType> = await prisma.wordData.findMany({ where: { user_id: req.body.user_id } });
        return res.status(OK).json(words);
    } catch (err) {
        return res.status(ServerError).json({ error: serverErrorMsg });
    }

});

// //DBの単語を取得するAPI（暗記モード）
// postsRouter.get("db_search_memorize", async (req: Request, res: Response) => {

// });

//時刻の取得
postsRouter.get("/get_time", (req: Request, res: Response) => {
    const now = new Date(Date.now());

    return res.status(OK).json(now);
});

//取り組んだ単語をDBに登録するAPI
postsRouter.post("/db_learning", async (req: Request, res: Response) => {
    const wordsArr: Array<WordDBType> = req.body.dbRequest;

    const updatePromises = wordsArr.map(async (word) => {
        const { 
            id, 
            user_id, 
            user_word_id, 
            user_answer, 
            correct_count, 
            correct_rate, 
            question_count,
            last_time_at, 
            complete, 
            right_or_wrong, 
        } = word;

        return await prisma.wordData.updateMany({
            where: {
                id,
                user_id,
                user_word_id
            },
            data: {
                last_time_at, 
                complete, 
                user_answer, 
                right_or_wrong, 
                correct_count,
                question_count,
                correct_rate
            }
        });
    });

    try {
        const updateResults = await Promise.all(updatePromises);
        return res.status(OK).json(updateResults);
    } catch (err) {
        console.error(err);
        return res.status(ServerError).json({ error: serverErrorMsg });
    };
});

//学習が完了した単語の状態をDBに登録するAPI
postsRouter.post("/db_finish", async (req: Request, res: Response) => {
    const wordsArr: Array<WordDBType> = req.body.finishQuestionWords;

    const updatePromises = wordsArr.map(async (word) => {
        const { 
            id, 
            user_id, 
            user_word_id, 
            user_answer,
            complete,
            right_or_wrong
        } = word;

        return await prisma.wordData.updateMany({
            where: {
                id, 
                user_id, 
                user_word_id
            },
            data: {
                user_answer,
                complete,
                right_or_wrong
            }
        });
    });

    try {
        const updateResults = await Promise.all(updatePromises);
        return res.status(OK).json(updateResults);
    } catch (err) {
        console.error(err);
        return res.status(ServerError).json({ error: serverErrorMsg });
    };
});