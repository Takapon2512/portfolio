import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//recoil
import { useRecoilState } from 'recoil';
import { memorizeWordsState } from '@/store/memorizePageState';

//MUI
import{
    Box,
    Typography,
    Button,
    Paper,
    TextField
} from "@mui/material";

//MUIIcon
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BackHandIcon from '@mui/icons-material/BackHand';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

//CSS
import styles from "./WordTest.module.scss";

//type
import { WordDBType } from '@/types/globaltype';

//utils
import { notoSansJP } from '@/utils/font';

//Components
import CircularWithValueLabel from '@/components/CircularProgressWithLabel/CirculerProgressWithLabel';
import apiClient from '@/lib/apiClient';

const WordTest = ({ timeConstraint }: { timeConstraint: number }) => {
    //router
    const router = useRouter();

    //本日分の英単語を取得・管理
    const [todayWords, setTodayWords] = useRecoilState<WordDBType[]>(memorizeWordsState);

    //現在の問題番号を管理
    const [problemNum, setProblemNum] = useState<number>(1);

    //テキストフィールドの監視
    const [answerText, setAnswerText] = useState<string>("");

    //正答数
    const [correctNum, setCorrectNum] = useState<number>(1);

    //残り時間の設定を受け取る
    const settingTime: number = timeConstraint;

    //残り時間を管理
    const [remainTime, setRemainTime] = useState<number>(settingTime);

    //入力を検知
    const [composing, setComposing] = useState<boolean>(false);

    //問題番号の配列を作成
    let intNumArr: Array<number> = [...Array(todayWords.length)].map((_, i) => i);
    
    intNumArr.forEach((_, index: number) => {
        let randomNum: number = Math.floor(Math.random() * (index + 1));
        let tmpNum: number = intNumArr[index];
        intNumArr[index] = intNumArr[randomNum];
        intNumArr[randomNum] = tmpNum;
    });

    const [intNum, setIntNum] = useState<number[]>(intNumArr);

    //画面に問題文を表示する
    const englishDisplay = () => {
        if (problemNum > todayWords.length) return "お疲れ様でした";
        return todayWords[intNum[problemNum - 1]].english;
    };

    //解答欄の内容を日本語に限定する
    const answerTextDisabled = () => {
        if (!answerText.match(/^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠、々〜]*$/) || answerText === "") return true;
        return false;
    };

    //「解答」ボタンを押したとき
    const handleAnswer = () => {
        const curretNum: number = problemNum;
        if (todayWords[intNum[curretNum - 1]].japanese === answerText) {
            userAnswerSituation(answerText, true);
            setCorrectNum(prev => prev + 1);
        } else {
            userAnswerSituation(answerText, false);
        };
        setProblemNum(prev => prev + 1);
        setRemainTime(settingTime);
        setAnswerText("");
    };

    //「パス」ボタンを押したとき
    const handlePass = () => {
        setProblemNum(prev => prev + 1);
        userAnswerSituation("", false);
        setAnswerText("");
        setRemainTime(settingTime);
    };

    //ユーザーの解答状況を記録
    const userAnswerSituation = (answer: string, rightOrWrong: boolean) => {
        const prevArr: Array<WordDBType> = [...todayWords];
        const prevWord: WordDBType = todayWords[intNum[problemNum - 1]];
        const addJudge: number = rightOrWrong ? prevWord.correct_count + 1 : prevWord.correct_count;
        const correctRate: number = Math.ceil(addJudge / (prevWord.question_count + 1)) * 100;

        prevArr[intNum[problemNum - 1]] = {
            ...prevWord,
            user_answer: answer,
            right_or_wrong: rightOrWrong,
            question_count: prevWord.question_count + 1,
            correct_count: addJudge,
            correct_rate: correctRate
        };
        const newArr: Array<WordDBType> = prevArr;
        setTodayWords(newArr);
    };
    console.log(todayWords);

    //解答欄でEnterキーを押したとき
    const onkeyDownEnter = (key: string) => {
        if (key === "Enter" && composing === false) handleAnswer();
    };

    //「結果を確認」ボタンを押したとき
    const confirmResult = async () => {
        try {
            const response = await apiClient.get("/posts/get_time");
            const responseData: Date = response.data;

            //型「WordDataType」を型「WordDBType」に変換する
            const dbRequest: Array<WordDBType> = todayWords.map((word: WordDBType) => (
                {
                id: word.id,
                english: word.english,
                japanese: word.japanese,
                created_at: word.created_at,
                deleted_at: null,
                last_time_at: responseData,
                complete: word.complete,
                today_learning: word.today_learning,
                user_answer: word.user_answer,
                right_or_wrong: word.right_or_wrong,
                correct_count: word.correct_count,
                question_count: word.question_count,
                correct_rate: Math.round((word.correct_count / word.question_count) * 100),
                user_word_id: word.user_word_id,
                user_id: word.user_id
                }
            ));

            await apiClient.post("/posts/db_learning", {
                dbRequest: dbRequest
            });
        } catch(err) {
            console.error(err);
        };

        router.push("/mypage/memorization/result");
    };

    useEffect(() => {
        //次の問題に遷移し、解答状況を反映する
        if (remainTime < 0 && problemNum <= todayWords.length) handlePass();

        if (problemNum < todayWords.length + 1) {
          const timer: NodeJS.Timer = setInterval(() => {
            setRemainTime(prev => prev >= -1 ? prev - 1 : settingTime);
          }, 1000);
          return () => {
            clearInterval(timer);
          };
        };
    }, [remainTime]);

    useEffect(() => {
        if (todayWords.length === 0) {
            alert("進行状況がリセットされたため、暗記カードからやり直しです。");
            router.push("/mypage/memorization");
        };
    }, []);

    return (
        <Box className={styles.memorize_firstContents}>
            <Typography className={`${notoSansJP.className} ${styles.memorize_testTitle}`}>
                確認テスト
            </Typography>
            {
                problemNum <= todayWords.length ? (
                    <Typography className={notoSansJP.className} sx={{marginBottom: 1}}>
                        次の英単語の日本語訳を答えよ。
                    </Typography>
                ) : (<></>)
            }
            <Paper
            className={styles.memorize_questionDisplay}
            >
                <Box className={styles.memorize_questionDisplayContainer}>
                    <Typography className={`${notoSansJP.className} ${styles.memorize_questionWord}`}>
                        { englishDisplay() }
                    </Typography>
                </Box>
                {
                    problemNum <= todayWords.length ? (
                        <>
                        <Box className={styles.memorize_questionCount}>
                            <Typography className={`${notoSansJP.className} ${styles.memorize_questionCountText}`}>
                                {problemNum} / {todayWords.length}
                            </Typography>
                        </Box>
                        <Box className={styles.memorize_remainTimer}>
                            <CircularWithValueLabel currentTime={remainTime} initValue={settingTime} />
                        </Box>
                        </>
                    ) : (<></>)
                }
            </Paper>
            {
                problemNum <= todayWords.length ? (
                    <Box className={styles.memorize_answerInput}>
                        <TextField 
                        label="解答欄（入力後、Enterキーを押下しても解答できます）"
                        fullWidth
                        value={answerText}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswerText(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => onkeyDownEnter(e.key)}
                        onCompositionStart={() => setComposing(true)}
                        onCompositionEnd={() => setComposing(false)}
                        />
                        <Box className={styles.memorize_answerButtons}>
                            <Button 
                            className={styles.memorize_answerButton}
                            disabled={answerTextDisabled()}
                            onClick={handleAnswer}
                            >
                                <LightbulbIcon className={styles.memorize_answerButtonsIcon} />
                                <Typography className={notoSansJP.className}>
                                    解答
                                </Typography>
                            </Button>
                            <Button 
                            className={styles.memorize_passButton}
                            onClick={handlePass}
                            >
                                <BackHandIcon className={styles.memorize_answerButtonsIcon} />
                                <Typography className={notoSansJP.className}>
                                    パス
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box className={styles.memorize_toResult}>
                        <Button
                        className={styles.memorize_toResultButton}
                        onClick={() => confirmResult()}
                        >
                            <TextSnippetIcon className={styles.memorize_toResultIcon} />
                            <Typography className={notoSansJP.className}>
                            結果を確認
                            </Typography>
                        </Button>
                    </Box>
                )
            }
        </Box>
    );
};

export default WordTest;