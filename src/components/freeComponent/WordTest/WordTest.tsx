import React, { useState } from 'react';
import { useRouter, NextRouter } from 'next/router';

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

//CSS
import styles from "./WordTest.module.scss";

//type
import { WordDataType } from '@/types/globaltype';

//utils
import { notoSansJP } from '@/utils/font';

const WordTest = () => {
  //router
  const router: NextRouter = useRouter();

  //DB内の英単語を取得
  const [dbWords, setDBWords] = useRecoilState<WordDataType[]>(dbWordsState);
  //現在の問題番号を管理
  const [problemNum, setProblemNum] = useState<number>(1);
  //テキストフィールドの監視
  const [answerText, setAnswerText] = useState<string>("");

  //出題状態の単語のみを取得
  const questionWords: Array<WordDataType> = 
    dbWords.filter((word: WordDataType) => word.register.match(/^出題$/));

  return (
    <Box className={styles.free_firstContents}>
        <Typography className={`${styles.free_testTitle} ${notoSansJP.className}`}>
            確認テスト
        </Typography>
        <Typography className={notoSansJP.className} sx={{marginBottom: 1}}>
          次の英単語の日本語訳を答えよ。
        </Typography>
        <Paper
        className={styles.free_questionDisplay}
        elevation={2}
        >
          <Box className={styles.free_questionDisplayContainer}>
            <Typography className={`${notoSansJP.className} ${styles.free_questionWord}`}>
              { questionWords[problemNum - 1].english }
            </Typography>
          </Box>
        </Paper>
        <Box className={styles.free_answerInput}>
          <TextField
          label="解答欄（入力後、Enterキーを押下しても解答できます）"
          fullWidth
          value={answerText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswerText(e.target.value)}
          />
          <Box className={styles.free_answerButtons}>
            <Button
            className={`${styles.free_answerButton} ${notoSansJP.className}`}
            >
              <LightbulbIcon className={styles.free_answerButtonsIcon} />
              <Typography className={notoSansJP.className}>
                解答
              </Typography>
            </Button>
            <Button
            className={`${styles.free_passButton} ${notoSansJP.className}`}
            >
              <BackHandIcon className={styles.free_answerButtonsIcon} />
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