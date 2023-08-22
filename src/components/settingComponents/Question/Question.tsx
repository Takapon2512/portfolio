import React from 'react';

//MUI
import { Box, Typography, TextField } from '@mui/material';

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
          type='number'
          />
        </Box>
        <Box className={styles.question_amount}>
          <Typography className={`${notoSansJP.className} ${styles.question_amountTitle}`}>
            取り組む問題数
          </Typography>
          <TextField 
          type='number'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Question;