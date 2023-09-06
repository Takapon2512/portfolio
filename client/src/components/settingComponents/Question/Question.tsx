import React, { useState } from 'react';

//MUI
import { Box, Typography, TextField, Button } from '@mui/material';

//CSS
import styles from "./Question.module.scss";

//utils
import { notoSansJP } from '@/utils/font';

//type
import { SettingType } from '@/types/globaltype';

//lib
import apiClient from '@/lib/apiClient';

const Question = ({ setting }: { setting: SettingType }) => {
  const num_timeLimitInit = setting.time_constraint;
  const num_questionsInit = setting.work_on_count;

  //下限・上限の値
  const num_timeLimitMin = 5;
  const num_timeLimitMax = 15;

  const num_questionsMin = 10;
  const num_questionsMax = 300;

  const [timeLimit, setTimeLimit] = useState<string>(String(num_timeLimitInit));
  const [questions, setQuestions] = useState<string>(String(num_questionsInit));

  const handleTimeLimit = (e: React.ChangeEvent<HTMLInputElement>) => setTimeLimit(e.target.value);
  const handleQuestions = (e: React.ChangeEvent<HTMLInputElement>) => setQuestions(e.target.value);

  const disabledJudge = () => {
    if ((Number(timeLimit) >= num_timeLimitMin && num_timeLimitMax >= Number(timeLimit)) 
    && (Number(questions) >= num_questionsMin && num_questionsMax >= Number(questions))) return false;

    return true;
  };

  //「変更する」をクリックしたときの処理
  const handleSettingChange = async () => {
    const num_timeLimit = Number(timeLimit);
    const num_questions = Number(questions);

    const updateData = { num_timeLimit, num_questions };
    const response = await apiClient.post("/users/mode_upload", updateData);

    alert(response.data.message);
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
          <Box sx={{ width: "100%",  }}>
            <TextField 
            fullWidth
            value={questions}
            onChange={handleQuestions}
            type='number'
            label="10〜300の値を入力してください"
            />
            <Box className={styles.question_amount_coution}>
              <Typography className={`${notoSansJP.className} ${styles.question_amountCoutionTitle}`}>
                ※問題数は明日以降の学習に反映されます。
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={styles.question_buttonWrapper}>
          <Button
          className={`${notoSansJP.className} ${styles.question_button}`}
          disabled={disabledJudge()}
          onClick={handleSettingChange}
          >
            変更する
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Question;