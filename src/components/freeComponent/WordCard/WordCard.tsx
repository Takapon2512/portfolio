import React, { useState } from 'react';
import { useRouter, NextRouter } from 'next/router';

//recoil
import { useRecoilState } from 'recoil';
import { dbWordsState } from '@/store/mypageState';

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
import { WordDataType } from '@/types/globaltype';

//utils
import { notoSansJP } from '@/utils/font';

const WordCard = () => {
  //router
  const router: NextRouter = useRouter();

  //DB内の英単語を取得
  const [dbWords, setDBWords] = useRecoilState<WordDataType[]>(dbWordsState);

  //英単語と日本語訳の切替を管理
  const [ejSwitch, setEJSwitch] = useState<boolean>(true);

  //出題状態の単語のみを取得
  const questionWords: Array<WordDataType> = 
    dbWords.filter((word: WordDataType) => word.register.match(/^出題$/) && word.complete === false);

  //現在の問題番号を管理
  const [problemNum, setProblemNum] = useState<number>(1);
  //覚えた単語の数を管理
  const [incompleteCount, setIncompleteCount] = useState<number>(0);

  //「覚えた！」ボタンをクリックしたときの処理
  const handleRemember = () => {
    const currentNum: number = problemNum;

    const dbWordsArr: Array<WordDataType> = [...dbWords];
    const questionWordsArr: Array<WordDataType> = [...questionWords];
    const prevWord: WordDataType = questionWordsArr[0 + incompleteCount];
    const newWord: WordDataType = {
      ...prevWord,
      complete: true
    };
    const DBWordsIndex: number = newWord.id - 1;
    dbWordsArr[DBWordsIndex] = newWord;
    
    setProblemNum(currentNum + 1);
    setDBWords(dbWordsArr);

    if (questionWords.length > 0 && currentNum === questionWords.length + (currentNum - incompleteCount) - 1) {
      setProblemNum(1);
      setIncompleteCount(0);
    };

    if (ejSwitch === false) setEJSwitch(true);
  };

  //「もう一度」ボタンをクリックしたときの処理
  const handleRetry = () => {
    const currentNum: number = problemNum;
    const currentIncompleteCount: number = incompleteCount;

    if (currentNum < questionWords.length + (currentNum - incompleteCount) - 1) {
      setProblemNum(currentNum + 1);
      setIncompleteCount(currentIncompleteCount + 1);
    } else if (currentNum >= questionWords.length + (problemNum - incompleteCount) - 1) {
      setProblemNum(1);
      setIncompleteCount(0);
    };

    if (ejSwitch === false) setEJSwitch(true);
  };

  //questionsWords配列が空のときは「お疲れ様でした」を表示する
  const englishDisplay = () => {
    if (questionWords.length === 0) return "お疲れ様でした";
    return questionWords[incompleteCount].english;
  };

  //questionWords配列が空のときは空文字を表示する
  const japaneseDisplay = () => {
    if (questionWords.length === 0) return "";
    return questionWords[incompleteCount].japanese;
  };

  //questionWords配列が空のときは英単語と日本語の切替をできなくさせる
  const handleEJSwitch = () => {
    if (questionWords.length === 0) {
      setEJSwitch(true);
    } else {
      setEJSwitch(!ejSwitch);
    }
  };

  const handleToTestPage = () => router.push("/mypage/free/test");

  return (
    <Box className={styles.free_firstContents}>
      <Typography className={`${styles.free_memoryTitle} ${notoSansJP.className}`}>
        英単語を暗記する
      </Typography>
      <Paper
      className={styles.free_memoryCard}
      elevation={2}
      onClick={handleEJSwitch}
      >
        <Box className={styles.free_memoryCardContainer}>
          <Typography className={`${styles.free_memoryWord} ${notoSansJP.className}`} variant='h2'>
            {
              ejSwitch ? englishDisplay() : japaneseDisplay()
            }
          </Typography>
        </Box>
        {
          problemNum <= questionWords.length + (problemNum - incompleteCount) - 1 ? (
            <Box className={styles.free_questionCount}>
              <Typography className={`${notoSansJP.className} ${styles.free_questionCountText}`}>
                { problemNum } / { questionWords.length + (problemNum - incompleteCount) - 1 }
              </Typography>
            </Box>
          ) : (<></>)
        }
      </Paper>
      <Box className={styles.free_nextButtons}>
        {
          problemNum <= questionWords.length + (problemNum - incompleteCount) - 1 ? (
            <>
              <Button 
              className={styles.free_remembered}
              onClick={handleRemember}
              >
                <SentimentVerySatisfiedIcon className={styles.free_nextButtonsIcon} />
                <Typography className={notoSansJP.className} sx={{paddingLeft: "15px"}}>
                  覚えた！
                </Typography>
              </Button>
              <Button 
              className={styles.free_notRemembered}
              onClick={handleRetry}
              >
                <SentimentVeryDissatisfiedIcon className={styles.free_nextButtonsIcon} />
                <Typography className={notoSansJP.className}>
                  もう一度
                </Typography>
              </Button>
            </>
          ) : (
            <Button
            className={styles.free_complete}
            onClick={handleToTestPage}
            >
              <QuizIcon className={styles.free_nextButtonsIcon} />
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