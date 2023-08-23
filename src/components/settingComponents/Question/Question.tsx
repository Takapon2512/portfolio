import React from 'react';

//MUI
import { Box, Typography, TextField, Button } from '@mui/material';

//CSS
import styles from "./Question.module.scss";

//utils
import { notoSansJP } from '@/utils/font';

const Question = () => {
  return (
    <Box className={styles.question}>
      <Typography className={`${notoSansJP.className} ${styles.question_title}`}>
        モード設定
      </Typography>
      <Box className={styles.question_container}>
        <Box className={styles.question_time}>
          <Typography className={`${notoSansJP.className} ${styles.question_timeTitle}`}>
            制限時間
          </Typography>
          <TextField 
          fullWidth
          type='number'
          label="5〜15の値を入力してください"
          />
        </Box>
        <Box className={styles.question_amount}>
          <Typography className={`${notoSansJP.className} ${styles.question_amountTitle}`}>
            取り組む問題数
          </Typography>
          <TextField 
          fullWidth
          type='number'
          label="10〜300の値を入力してください"
          />
        </Box>
        <Box className={styles.question_buttonWrapper}>
          <Button
          className={`${notoSansJP.className} ${styles.question_button}`}
          >
            設定する
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Question;