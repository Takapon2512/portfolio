import React, { useState } from 'react';

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

//CSS
import styles from "./WordCard.module.scss";

//type
import { WordDataType } from '@/types/globaltype';

//utils
import { notoSansJP } from '@/utils/font';

const WordCard = () => {
  //DB内の英単語を取得
  const [dbWords, setDBWords] = useRecoilState<WordDataType[]>(dbWordsState);

  //英単語と日本語訳の切替を管理
  const [ejSwitch, setEJSwitch] = useState<boolean>(true);

  //出題状態の単語のみを取得
  const questionWords: Array<WordDataType> = 
    dbWords.filter((word: WordDataType) => word.register.match(/^出題$/));

  //現在の問題番号を管理
  const [problemNum, setProblemNum] = useState<number>(1);

  //カードをクリックしたときに英単語と日本語の表示を切り替える
  const handleCardChange = () => {
    setEJSwitch(!ejSwitch);
  }

  //「覚えた！」ボタンをクリックしたとき
  const handleRemember = () => {
    const currentNum = problemNum;
    setProblemNum(currentNum + 1);
  };

  //「もう一度」ボタンをクリックしたとき
  const handleRetry = () => {
    const currentNum = problemNum;
    setProblemNum(currentNum + 1);
  }

  return (
    <Box className={styles.free_firstContents}>
      <Typography className={`${styles.free_memoryTitle} ${notoSansJP.className}`}>
        英単語を暗記する
      </Typography>
      <Paper 
      className={styles.free_memoryCard}
      elevation={2}
      onClick={handleCardChange}
      >
        <Box className={styles.free_memoryCardContainer}>
          <Typography className={`${styles.free_memoryWord} ${notoSansJP.className}`} variant='h2'>
            {
              ejSwitch ? questionWords[problemNum - 1].english : questionWords[problemNum - 1].japanese
            }
          </Typography>
        </Box>
      </Paper>
      <Box className={styles.free_nextButtons}>
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
      </Box>
    </Box>
  );
};

export default WordCard;