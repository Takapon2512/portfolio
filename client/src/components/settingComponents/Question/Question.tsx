import React, { useState } from 'react';

//MUI
import { Box, Typography, TextField, Button } from '@mui/material';

//CSS
import styles from "./Question.module.scss";

//utils
import { notoSansJP } from '@/utils/font';

//type
import { SettingType } from '@/types/globaltype';

const Question = ({ setting }: { setting: SettingType }) => {
  const num_timeLimit = setting.time_constraint;
  const num_questions = setting.work_on_count;

  //下限・上限の値
  const num_timeLimitMin = 5;
  const num_timeLimitMax = 15;

  const num_questionsMin = 10;
  const num_questionsMax = 300;

  const [timeLimit, setTimeLimit] = useState<string>(String(num_timeLimit));
  const [questions, setQuestions] = useState<string>(String(num_questions));

  const handleTimeLimit = (e: React.ChangeEvent<HTMLInputElement>) => setTimeLimit(e.target.value);
  const handleQuestions = (e: React.ChangeEvent<HTMLInputElement>) => setQuestions(e.target.value);

  const disabledJudge = () => {
    if ((Number(timeLimit) >= num_timeLimitMin && num_timeLimitMax >= Number(timeLimit)) 
    && (Number(questions) >= num_questionsMin && num_questionsMax >= Number(questions))) return false;

    return true;
  };

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
          value={timeLimit}
          onChange={handleTimeLimit}
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
          value={questions}
          onChange={handleQuestions}
          type='number'
          label="10〜300の値を入力してください"
          />
        </Box>
        <Box className={styles.question_buttonWrapper}>
          <Button
          className={`${notoSansJP.className} ${styles.question_button}`}
          disabled={disabledJudge()}
          >
            変更する
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Question;