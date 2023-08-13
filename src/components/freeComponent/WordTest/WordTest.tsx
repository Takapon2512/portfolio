import React from 'react';
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

//CSS
import styles from "./WordTest.module.scss";

//type
import { WordDataType } from '@/types/globaltype';

//utils
import { notoSansJP } from '@/utils/font';

const WordTest = () => {
  return (
    <Box className={styles.free_firstContents}>
        <Typography className={`${styles.free_testTitle} ${notoSansJP.className}`}>
            確認テスト
        </Typography>
        <Typography className={styles.notoSansJP} sx={{marginBottom: 1}}>
          次の英単語の日本語訳を答えよ。
        </Typography>
        <Paper
        className={styles.free_questionDisplay}
        elevation={2}
        >
          <Box className={styles.free_questionDisplayContainer}>
            <Typography className={`${notoSansJP.className} ${styles.free_questionWord}`}>
              organization
            </Typography>
          </Box>
        </Paper>
        <Box className={styles.free_answerInput}>
          <TextField 
          label="解答欄"
          fullWidth
          />
          <Box className={styles.free_answerButtons}>
            <Button
            className={`${styles.free_answerButton} ${notoSansJP.className}`}
            >
              解答
            </Button>
            <Button
            className={`${styles.free_passButton} ${notoSansJP.className}`}
            >
              パス
            </Button>
          </Box>
        </Box>
    </Box>
  );
};

export default WordTest;