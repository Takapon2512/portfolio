import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { scheduleJob } from "node-schedule";

//type
import { WordDBType, SettingType } from '../types/ApiTypes';

//utils
import { ServerError, Created, OK } from '../utils/StatusCode';
import { serverErrorMsg } from "../utils/message";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { normalBorder, goodBorder } from "../utils/border";

export const postsRouter: Router = Router();
const prisma: PrismaClient = new PrismaClient();

//毎日23時55分に学習対象になっている単語の「today_learning」をfalseにする
scheduleJob('55 23 * * *', async () => {
    try {
        let i = 1;
        while (true) {
            //ユーザー情報を持ってくる
            const userData = await prisma.user.findUnique({
                where: { id: i }
            });
            //データが取れなくなったら、While文を抜ける
            if (userData === null) break;

            const words: Array<WordDBType> = await prisma.wordData.findMany({ 
                where: { user_id: userData.uid, today_learning: true } 
            });
        
            //サボり判定
            const slackingJudge = (word: WordDBType) => {
                const now: Date = new Date(Date.now());
                // //本日の0時を取得
                const todayMidnight: Date = new Date(now);
                todayMidnight.setHours(0, 0, 0, 0);
    
                //明日の0時を取得
                const tomorrowMidnight: Date = new Date(now);
                tomorrowMidnight.setDate(tomorrowMidnight.getDate() + 1);
                tomorrowMidnight.setHours(0, 0, 0, 0);

                if (word.last_time_at === null) return true;
                if (!(tomorrowMidnight >= word.last_time_at 
                    && word.last_time_at >= todayMidnight)) return true;
                
                return false;
            };

            words.map(async (word) => {
                return await prisma.wordData.updateMany({
                    where: {
                        id: word.id,
                        user_id: word.user_id,
                        user_word_id: word.user_word_id
                    },
                    data: {
                        correct_count: slackingJudge(word) ? 0 : word.correct_count,
                        correct_rate: slackingJudge(word) ? 0 : word.correct_rate,
                        question_count: slackingJudge(word) ? 0 : word.question_count,
                        today_learning: false
                    },
                });
            });
            i++;
        };

        i = 1;
        console.log("ループを抜ける");
    } catch (err) {
        console.error(err);
    };
});

//毎日0時0分に学習予定の単語の「today_learning」をtrueにする
scheduleJob('0 0 * * *', async () => {
    try {
        let i = 1;
        while (true) {
            //ユーザー情報を持ってくる
            const userData = await prisma.user.findUnique({
                where: { id: i }
            });
            //ユーザー情報が取れない場合はループを抜ける
            if (userData === null) break;
            const words: Array<WordDBType> = await prisma.wordData.findMany({ 
                where: { user_id: userData.uid, deleted_at: null } 
            });
            const setting: SettingType | null = await prisma.setting.findUnique({
                where: { user_id: userData.uid } 
            });
            if (setting === null) break;

            //単語を絞る（優先度S：未学習の単語）
            const notLearningWords: Array<WordDBType> = words.filter((word) => 
                word.last_time_at === null
            );

            //単語を絞る（優先度A：出題回数が1回以上10回未満の単語）
            const fewerWords: Array<WordDBType> = words.filter((word) => 
                word.question_count >= 1 
                && 10 > word.question_count
            );

            //単語を絞る（優先度B：分類「苦手」の単語。ただし、優先度SとAに当てはまらないようにする。）
            const weakWords: Array<WordDBType> = words.filter((word) => 
                normalBorder > word.correct_rate 
                && word.question_count >= 10
            );

            //単語を絞る（優先度C：分類「まあまあ」の単語。ただし、優先度SとAに当てはまらないようにする。）
            const normalWords: Array<WordDBType> = words.filter((word) => 
                word.correct_rate >= normalBorder 
                && goodBorder > word.correct_rate 
                && word.question_count >= 10
            );

            //単語を絞る（優先度D：分類「得意」の単語。ただし、優先度SとAに当てはまらないようにする。）
            const goodWords: Array<WordDBType> = words.filter((word) => 
                goodBorder >= word.correct_rate 
                && word.question_count >= 10
            );

            //絞った単語を格納し、制限数より後の単語をカットする
            const filterWords: Array<WordDBType> = [
                ...notLearningWords,
                ...fewerWords,
                ...weakWords,
                ...normalWords, 
                ...goodWords
            ].sort((x, y) => x.correct_count - y.correct_count).slice(0, setting.work_on_count);

            filterWords.map(async (word) => {
                return await prisma.wordData.updateMany({
                    where: {
                        id: word.id,
                        user_id: word.user_id,
                        user_word_id: word.user_word_id
                    },
                    data: {
                        today_learning: true
                    },
                });
            });
            i++;
        };

        i = 1;
        console.log("ループを抜ける");
    } catch (err) {
        console.error(err);
    }
});

//単語に重複があるかを調べる関数
const hasDuplicateEnglish = (userWords: Array<WordDBType>, wordsArr: Array<WordDBType>) => {
    const englishSet = new Set<string>(userWords.map(word => word.english));
    const duplicates: Array<WordDBType> = wordsArr.filter(word => englishSet.has(word.english));

    if (duplicates.length > 0) return true;
    return false;
};

//単語をDBに登録するAPI
postsRouter.post("/db_register", isAuthenticated, async (req: Request, res: Response) => {
    const WordsArr: Array<WordDBType> = req.body.dbRegisterWords;

    //uid情報を追加
    const userWordsArr: Array<WordDBType> = WordsArr.map((word) => (
        { ...word, user_id: req.body.user_id }
    ))

    //ログインしているユーザーの単語を取得する
    const userWords = await prisma.wordData.findMany({ where: { user_id: req.body.user_id } });
    if (!userWords) return res.status(ServerError).json({ error: "そのユーザーの単語を取得できませんでした。" });
    if (hasDuplicateEnglish(userWords, userWordsArr)) return res.status(ServerError).json({ error: "すでに登録されている単語が存在します。" });

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
        const words: Array<WordDBType> = await prisma.wordData.findMany({ where: { user_id: req.body.user_id, deleted_at: null } });
        return res.status(OK).json(words);
    } catch (err) {
        return res.status(ServerError).json({ error: serverErrorMsg });
    };
});

//本日分の単語を取得するAPI
postsRouter.get("/db_search_memorize", isAuthenticated, async (req: Request, res: Response) => {
    try {
        const todayWords: Array<WordDBType> = await prisma.wordData.findMany({ where: { user_id: req.body.user_id, today_learning: true } });

        return res.status(OK).json(todayWords);
    } catch (err) {
        return res.status(ServerError).json({ error: serverErrorMsg });
    };

});

//出題登録した単語を取得するAPI
postsRouter.get("/db_search_free", isAuthenticated, async (req: Request, res: Response) => {
    try {
        const questionWords: Array<WordDBType> = await prisma.wordData.findMany({ where: { user_id: req.body.user_id, free_learning: true } });
        return res.status(OK).json(questionWords);
    } catch(err) {
        return res.status(ServerError).json({ erroor: serverErrorMsg });
    };
});

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

//フリーモードで出題する単語の「free_learning」をtrueにするAPI
postsRouter.post("/db_free_register", isAuthenticated, async (req: Request, res: Response) => {
    const wordsArr: Array<WordDBType> = req.body.freeWords;
    const updatePromises = wordsArr.map(async (word: WordDBType) => {
        const {
            id, 
            user_id, 
            user_word_id,
            free_learning
        } = word;

        return await prisma.wordData.updateMany({
            where: {
                id,
                user_id,
                user_word_id
            },
            data: { free_learning }
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
            right_or_wrong,
            free_learning
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
                right_or_wrong,
                free_learning
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

//出題状態を初期化するAPI
postsRouter.post("/freelearning_reset", async (req: Request, res: Response) => {
    const wordsArr: Array<WordDBType> = req.body.resetWordsArr;
    const updatePromises = wordsArr.map(async (word) => {
        const {
            id,
            user_id,
            free_learning
        } = word;

        return await prisma.wordData.updateMany({
            where: {
                id,
                user_id
            },
            data: { free_learning }
        });
    });

    try {
        const updateResults = await Promise.all(updatePromises);
        return res.status(OK).json(updateResults);
    } catch (err) {
        console.error(err);
    };
});

//解答4つを取得するAPI（暗記モード用）
postsRouter.get("/db_sp_memorize_answer", isAuthenticated, async (req: Request, res: Response) => {
    try {
        const words: Array<WordDBType> = await prisma.wordData.findMany({ where: { user_id: req.body.user_id, today_learning: true } });
        
        //問題番号の配列を作成
        const wordsIdArr: Array<number> = words.map((word) => word.user_word_id);
        
        //配列番号をシャッフルする
        wordsIdArr.forEach((_, index: number) => {
            let randomNum: number = Math.floor(Math.random() * (index + 1));
           [wordsIdArr[index], wordsIdArr[randomNum]] = [wordsIdArr[randomNum], wordsIdArr[index]]; 
        });

        return res.status(OK).json(wordsIdArr);

    } catch(err) {
        console.error(err);
        return res.status(ServerError).json({ error: serverErrorMsg });
    }
});

//単語を編集するAPI
postsRouter.post("/edit_word", async (req: Request, res: Response) => {
    try {
        const targetWord: WordDBType = req.body.editWord;
        console.log(targetWord);
    
        //同じ単語がないかを調べる処理
        const wordSearch: WordDBType | null = await prisma.wordData.findUnique({ 
            where: { 
                id: targetWord.id, 
                user_id: targetWord.user_id, 
                user_word_id: targetWord.user_word_id,
                english: targetWord.english
            }
        });
        if (wordSearch !== null) return res.status(ServerError).json({ error: serverErrorMsg });
        
        //編集した単語をDBに反映する
        await prisma.wordData.update({
            where: {
                id: targetWord.id, 
                user_id: targetWord.user_id, 
                user_word_id: targetWord.user_word_id,
            },
            data: {
                english: targetWord.english,
                japanese: targetWord.japanese
            }
        });
        return res.status(OK).json({ message: "更新に成功しました。" });
    } catch (err) {
        console.error(err);
        return res.status(ServerError).json({ error: serverErrorMsg });
    };
});

//単語を削除するAPI
postsRouter.post("/delete_word", async (req: Request, res: Response) => {
    try {
        const targetWord: WordDBType = req.body.deleteWord;
        const now = new Date(Date.now());

        await prisma.wordData.update({
            where: {
                id: targetWord.id,
                user_id: targetWord.user_id,
                user_word_id: targetWord.user_word_id
            },
            data: { deleted_at: now }
        });

        return res.status(OK).json({ message: "削除に成功しました。" })
    } catch (err) {
        console.error(err);
        return res.status(ServerError).json({ error: serverErrorMsg });
    };
});