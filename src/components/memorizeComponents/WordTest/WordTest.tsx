import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//recoil
import { useRecoilState } from 'recoil';
import { dbWordsState } from '@/store/mypageState';

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
import { WordDataType } from '@/types/globaltype';

//utils
import { notoSansJP } from '@/utils/font';

//Components
import CircularWithValueLabel from '@/components/CircularProgressWithLabel/CirculerProgressWithLabel';

const WordTest = () => {
    //router
    const router = useRouter();

    //本日分の英単語を取得・管理
    const [todayWords, setTodayWords] = useRecoilState<WordDataType[]>(dbWordsState);

    //現在の問題番号を管理
    const [problemNum, setProblemNum] = useState<number>(1);

    //テキストフィールドの監視
    const [answerText, setAnswerText] = useState<string>("");

    //正答数
    const [correctNum, setCorrectNum] = useState<number>(1);

    //残り時間の設定を受け取る
    const [settingTime, setSettingTime] = useState(10);

    //残り時間を管理
    const [remainTime, setRemainTime] = useState<number>(settingTime);

    //問題番号の配列を作成
    let intNumArr: Array<number> = [...Array(todayWords.length)].map((_, i) => i);
    
    intNumArr.forEach((_, index: number) => {
        let randomNum: number = Math.floor(Math.random() * (index + 1));

        let tmp: number = intNumArr[index];

        intNumArr[index] = intNumArr[randomNum];
        intNumArr[randomNum] = tmp;
    });

    const [intNum, setIntNum] = useState<number[]>(intNumArr);
    console.log(todayWords);

    //画面に問題文を表示する
    const englishDisplay = () => {
        if (problemNum > todayWords.length) return "お疲れ様でした";
        return todayWords[intNum[problemNum - 1]].english;
    };

    //「解答」ボタンを押したとき
    const handleAnswer = () => {
        const curretNum: number = problemNum;

        if (todayWords[intNum[curretNum - 1]].japanese === answerText) {
            console.log("正解");
            userAnswerDB(answerText, true);
            setCorrectNum(prev => prev + 1);
            localStorageStore();
        } else {
            console.log("不正解");
            userAnswerDB(answerText, false);
        };

        setProblemNum(prev => prev + 1);
        setRemainTime(settingTime);
        setAnswerText("");
    };

    const handlePass = () => {
        setProblemNum(prev => prev + 1);
        setRemainTime(settingTime);
    };

    //localStorageに正解数を保存
    const localStorageStore = () => {
        const jsonCorrectnum: string = JSON.stringify(correctNum);
        localStorage.setItem("correct", jsonCorrectnum);
    };

    //ユーザーの解答状況をDBに記録
    const userAnswerDB = (answer: string, rightOrWrong: boolean) => {
        const prevArr: Array<WordDataType> = [...todayWords];
        const prevWord: WordDataType = todayWords[intNum[problemNum - 1]];
        prevArr[prevWord.id - 1] = {
            ...prevWord,
            yourAnswer: answer,
            rightWrong: rightOrWrong
        };
        const newArr: Array<WordDataType> = prevArr;

        setTodayWords(newArr);
    };

    //制限時間の残りが0になったとき、次の問題に遷移し、解答状況をDBに反映する
    if (remainTime === -1 && problemNum <= todayWords.length) {
        setProblemNum(prev => prev + 1);
        setRemainTime(settingTime);
        setAnswerText("");
    };

    useEffect(() => {
        localStorage.setItem("correct", "0");
        if (problemNum < todayWords.length + 1) {
          const timer: NodeJS.Timer = setInterval(() => {
            setRemainTime(prev => prev >= -1 ? prev - 1 : settingTime);
          }, 1000);
          return () => {
            clearInterval(timer);
          };
        }
    }, []);

    return (
        <Box className={styles.memorize_firstContents}>
            <Typography className={`${notoSansJP.className} ${styles.memorize_testTitle}`}>
                確認テスト
            </Typography>
            <Typography className={notoSansJP.className} sx={{marginBottom: 1}}>
                次の英単語の日本語訳を答えよ。
            </Typography>
            <Paper
            className={styles.memorize_questionDisplay}
            >
                <Box className={styles.memorize_questionDisplayContainer}>
                    <Typography className={`${notoSansJP.className} ${styles.memorize_questionWord}`}>
                        { englishDisplay() }
                    </Typography>
                </Box>
                <Box className={styles.memorize_questionCount}>
                    <Typography className={`${notoSansJP.className} ${styles.memorize_questionCountText}`}>
                        {problemNum} / {todayWords.length}
                    </Typography>
                </Box>
                <Box className={styles.memorize_remainTimer}>
                    <CircularWithValueLabel currentTime={remainTime} initValue={settingTime} />
                </Box>
            </Paper>
            <Box className={styles.memorize_answerInput}>
                <TextField 
                label="解答欄（入力後、Enterキーを押下しても解答できます）"
                fullWidth
                value={answerText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswerText(e.target.value)}
                />
                <Box className={styles.memorize_answerButtons}>
                    <Button 
                    className={styles.memorize_answerButton}
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
        </Box>
    );
};

export default WordTest;