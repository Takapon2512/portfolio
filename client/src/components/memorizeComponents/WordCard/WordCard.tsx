import React, { useState, useEffect } from 'react';
import { useRouter, NextRouter } from 'next/router';

//recoil
import { useRecoilState } from 'recoil';
import { memorizeWordsState } from '@/store/memorizePageState';

//MUI
import {
  Box,
  Typography,
  Button,
  Paper
} from "@mui/material";

//MUIIcon
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import QuizIcon from '@mui/icons-material/Quiz';

//CSS
import styles from "./WordCard.module.scss";

//type
import { WordDBType } from '@/types/globaltype';

//utils
import { notoSansJP } from '@/utils/font';
import apiClient from '@/lib/apiClient';

const WordCard = ({ todayWords }: { todayWords: WordDBType[] }) => {
    //router
    const router: NextRouter = useRouter();

    //complete変更前と変更後の単語を格納する
    const [completeWords, setCompleteWords] = useState<WordDBType[]>([...todayWords]);
    //wordTestで共有するために単語を格納
    const [testWords, setTestWords] = useRecoilState<WordDBType[]>(memorizeWordsState);

    //英単語と日本語訳の切り替え
    const [ejSwitch, setEJSwitch] = useState<boolean>(true);

    //completeがfalseの単語のみを取得
    const incompleteWords: Array<WordDBType> = completeWords.filter(word => word.complete === false);

    //現在の問題番号を管理
    const [problemNum, setProblemNum] = useState<number>(1);
    //覚えていない単語の数を管理
    const [incompleteCount, setIncompleteCount] = useState<number>(0);

    //「覚えた！」ボタンをクリックしたとき
    const handleRemember = () => {
        const currentNum: number = problemNum;

        const todayWordsArr: Array<WordDBType> = [...completeWords];
        const incompleteWordsArr: Array<WordDBType> = [...incompleteWords];
        const prevWord: WordDBType = incompleteWordsArr[0 + incompleteCount];
        const newWord: WordDBType = {
            ...prevWord,
            complete: true
        };
        todayWordsArr[problemNum - 1] = newWord;

        setProblemNum(currentNum + 1);
        setCompleteWords(todayWordsArr);

        if (incompleteWords.length > 0 && currentNum === incompleteWords.length + (currentNum - incompleteCount) - 1) {
            setProblemNum(1);
            setIncompleteCount(0);
        }

        if (ejSwitch === false) setEJSwitch(true);
    };

    //「もう一度」ボタンをクリックしたとき
    const handleRetry = () => {
        const currentNum: number = problemNum;
        const currentIncomplete: number = incompleteCount;

        if (currentNum < incompleteWords.length + (currentNum - incompleteCount) - 1 ) {
            setProblemNum(currentNum + 1);
            setIncompleteCount(currentIncomplete + 1);
        } else if (currentNum >= incompleteWords.length + (currentNum - incompleteCount) - 1) {
            setProblemNum(1);
            setIncompleteCount(0);
        };
    };

    //英単語を画面に表示する関数
    const englishDisplay = () => {
        if (incompleteWords.length === 0) return "お疲れ様でした";
        return incompleteWords[0 + incompleteCount].english;
    };

    //日本語を画面に表示する関数
    const japaneseDisplay = () => {
        if (incompleteWords.length === 0) return "";
        return incompleteWords[0 + incompleteCount].japanese;
    };

    const handleEJSwitch = () => {
        if (incompleteWords.length === 0) {
            setEJSwitch(true);
        } else {
            setEJSwitch(!ejSwitch);
        };
    };

    const handleToTest = async () => {
        setTestWords(completeWords);
        await apiClient.post("/posts/db_learning", { dbRequest: completeWords });
        router.push("/mypage/memorization/test");
    };

    //テストモードに遷移した後に、暗記モードのトップ画面に戻り「暗記する」ボタンを押しても暗記カードで学習に取り組めるようにする
    useEffect(() => {
        const prevArr: Array<WordDBType> = [...completeWords];
        const newArr: Array<WordDBType> = prevArr.map((word: WordDBType) => (
        {
            ...word,
            complete: false
        }
        ));
        setCompleteWords(newArr);
        setProblemNum(1);
        setIncompleteCount(0);
    }, []);

    return (
        <Box className={styles.memorize_firstContents}>
            <Typography className={`${styles.memorize_memoryTitle} ${notoSansJP.className}`}>
                英単語を暗記する
            </Typography>
            <Paper
            className={styles.memorize_memoryCard}
            elevation={2}
            onClick={handleEJSwitch}
            >
                <Box className={styles.memorize_memoryCardContainer}>
                    <Typography 
                    variant='h2'
                    className={`${notoSansJP.className} ${styles.memorize_memoryWord}`}>
                        {
                            ejSwitch ? englishDisplay() : japaneseDisplay()
                        }
                    </Typography>
                </Box>
                {
                    problemNum <= incompleteWords.length + ( problemNum - incompleteCount ) - 1 ? (
                        <Box 
                        className={styles.memorize_questionCount}>
                            <Typography 
                            className={`${notoSansJP.className} ${styles.memorize_questionCountText}`}>
                                { problemNum } / { incompleteWords.length + ( problemNum - incompleteCount ) - 1 }
                            </Typography>
                        </Box>
                    ) : (<></>)
                }
            </Paper>
            <Box className={styles.memorize_nextButtons}>
                {
                    problemNum <= incompleteWords.length + (problemNum - incompleteCount) - 1 ? (
                        <>
                        <Button 
                        className={styles.memorize_remembered}
                        onClick={handleRemember}
                        >
                            <SentimentVerySatisfiedIcon className={styles.memorize_nextButtonsIcon} />
                            <Typography className={notoSansJP.className} sx={{paddingLeft: "15px"}}>
                            覚えた！
                            </Typography>
                        </Button>
                        <Button 
                        className={styles.memorize_notRemembered}
                        onClick={handleRetry}
                        >
                            <SentimentVeryDissatisfiedIcon className={styles.memorize_nextButtonsIcon} />
                            <Typography className={notoSansJP.className}>
                            もう一度
                            </Typography>
                        </Button>
                        </>
                    ) : (
                        <Button
                        className={styles.memorize_complete}
                        onClick={handleToTest}
                        >
                        <QuizIcon className={styles.memorize_nextButtonsIcon} />
                        <Typography className={notoSansJP.className}>
                            確認テストを行う
                        </Typography>
                        </Button>
                    )
                }
            </Box>
        </Box>
    );
};

export default WordCard;