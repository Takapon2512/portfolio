import React, { useEffect, useState } from 'react';
import { useRouter, NextRouter } from 'next/router';

//recoil
import { useRecoilState } from 'recoil';
import { WordsState } from '@/store/freePageState';

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
import { WordDBType, WordDataType } from '@/types/globaltype';

//utils
import { notoSansJP } from '@/utils/font';

//Components
import CircularWithValueLabel from '@/components/CircularProgressWithLabel/CirculerProgressWithLabel';
import apiClient from '@/lib/apiClient';

const WordTest = () => {
  //router
  const router: NextRouter = useRouter();
  //暗記カードで出題した英単語を取得
  const [dbWords, setDBWords] = useRecoilState<WordDataType[]>(WordsState);
  //現在の問題番号を管理
  const [problemNum, setProblemNum] = useState<number>(1);
  //テキストフィールドの監視
  const [answerText, setAnswerText] = useState<string>("");
  //残り時間の初期設定
  const settingTime = 10;
  //残り時間を管理
  const [remainTime, setRemainTime] = useState<number>(settingTime);

  //入力を検知
  const [composing, setComposing] = useState<boolean>(false);

  //出題状態の単語のみを取得
  const questionWords: Array<WordDataType> = 
  dbWords.filter((word: WordDataType) => word.question_register === "出題" && word.complete === true);

  //問題番号の配列を作成
  let intNumArr: Array<number> = [...Array(questionWords.length)].map((_, i: number) => i);

  //問題番号をシャッフルする
  intNumArr.forEach((_, index: number) => {
    let randomNum: number = Math.floor(Math.random() * (index + 1));
    let tmpNum: number = intNumArr[index];
    intNumArr[index] = intNumArr[randomNum];
    intNumArr[randomNum] = tmpNum;
  });

  const [intNum, setIntNum] = useState<number[]>(intNumArr);

  //解答欄の内容を日本語に限定する
  const answerTextDisabled = () => {
    if (!answerText.match(/^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠、々〜]*$/) || answerText === "") return true;
    return false;
  };

  //解答ボタンを押したとき
  const handleAnswer = () => {
    const currentNum: number = problemNum;
    if (questionWords[intNum[problemNum - 1]].japanese === answerText) {
      userAnswerSituation(answerText, true);
    } else {
      userAnswerSituation(answerText, false);
    }
    setProblemNum(currentNum + 1);
    setRemainTime(settingTime);
    setAnswerText("");
  };

  //パスボタンを押したとき
  const handlePass = () => {
    const currentNum: number = problemNum;

    setProblemNum(currentNum + 1);
    userAnswerSituation("", false);
    setAnswerText("");
    setRemainTime(settingTime);
  };

  //問題の表示
  const englishDisplay = () => {
    if (problemNum > questionWords.length) return "お疲れ様でした";
    return questionWords[intNum[problemNum - 1]].english;
  };

  //ユーザーの解答状況を記録
  const userAnswerSituation = (answer: string, rightOrWrong: boolean) => {
    const prevArr: Array<WordDataType> = [...dbWords];
    const prevWord: WordDataType = questionWords[intNum[problemNum - 1]];

    const dbIndex: number = prevArr.indexOf(prevWord);

    prevArr[dbIndex] = {
      ...prevWord,
      user_answer: answer,
      right_or_wrong: rightOrWrong,
      question_count: prevWord.question_count + 1,
      correct_count: rightOrWrong ? prevWord.correct_count + 1 : prevWord.correct_count
    };
    const newArr: Array<WordDataType> = [...prevArr];
    setDBWords(newArr);
    console.log(dbWords);
  };

  //解答欄でEnterキーを押したとき
  const onkeyDownEnter = (key: string) => {
    if (key === "Enter" && composing === false) handleAnswer();
  };

  //結果を確認ボタンを押したとき
  const handleResultToDB = async () => {

    try {
      const response = await apiClient.get("/posts/get_time");
      const responseData: Date = response.data;

      //型「WordDataType」を型「WordDBType」に変換する
      const dbRequest: Array<WordDBType> = dbWords.map((word: WordDataType) => (
        {
          id: word.id,
          english: word.english,
          japanese: word.japanese,
          created_at: word.created_at,
          deleted_at: null,
          last_time_at: responseData,
          complete: word.complete,
          user_answer: word.user_answer,
          right_or_wrong: word.right_or_wrong,
          correct_count: word.correct_count,
          question_count: word.question_count,
          correct_rate: Math.round((word.correct_count / word.question_count * 10) / 10) * 100,
          user_word_id: word.user_word_id,
          user_id: word.user_id
        }
      ));

      await apiClient.post("/posts/db_learning", {
        dbRequest: dbRequest
      });

    } catch (err) {
      console.error(err);
    }

    router.push("/mypage/free/result");
  };

  useEffect(() => {
    //次の問題に遷移し、解答状況をDBに反映する
    if (remainTime < 0 && problemNum <= questionWords.length) handlePass();

    if (problemNum < questionWords.length + 1) {
      const timer: NodeJS.Timer = setInterval(() => {
        setRemainTime(prev => prev > -1 ? prev - 1 : settingTime);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    };
  }, [remainTime]);

  return (
    <>
    <Box className={styles.free_firstContents}>
        <Typography className={`${styles.free_testTitle} ${notoSansJP.className}`}>
            確認テスト
        </Typography>
        {
          problemNum <= questionWords.length ? (
            <Typography className={notoSansJP.className} sx={{marginBottom: 1}}>
              次の英単語の日本語訳を答えよ。
            </Typography>
          ) : (<></>)
        }
        <Paper
        className={styles.free_questionDisplay}
        elevation={2}
        >
          <Box className={styles.free_questionDisplayContainer}>
            <Typography className={`${notoSansJP.className} ${styles.free_questionWord}`}>
              { englishDisplay() }
            </Typography>
          </Box>
          {
            problemNum <= questionWords.length ? (
              <Box className={styles.free_questionCount}>
                <Typography className={`${notoSansJP.className} ${styles.free_questionCountText}`}>
                  { problemNum } / { questionWords.length }
                </Typography>
              </Box>
            ) : (<></>)
          }
          {
            problemNum <= questionWords.length ? (
              <Box className={styles.free_remainTimer}>
                <CircularWithValueLabel currentTime={remainTime} initValue={settingTime} />
              </Box>
            ) : ( <></> )
          }
        </Paper>
        {
          problemNum <= questionWords.length ? (
            <Box className={styles.free_answerInput}>
              <TextField
              label="解答欄（入力後、Enterキーを押下しても解答できます）"
              fullWidth
              value={answerText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswerText(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => onkeyDownEnter(e.key)}
              onCompositionStart={() => setComposing(true)}
              onCompositionEnd={() => setComposing(false)}
              />
              <Box className={styles.free_answerButtons}>
                <Button
                className={`${styles.free_answerButton} ${notoSansJP.className}`}
                disabled={answerTextDisabled()}
                onClick={handleAnswer}
                >
                  <LightbulbIcon className={styles.free_answerButtonsIcon} />
                  <Typography className={notoSansJP.className}>
                    解答
                  </Typography>
                </Button>
                <Button
                className={`${styles.free_passButton} ${notoSansJP.className}`}
                onClick={handlePass}
                >
                  <BackHandIcon className={styles.free_answerButtonsIcon} />
                  <Typography className={notoSansJP.className}>
                    パス
                  </Typography>
                </Button>
              </Box>
            </Box>
          ) : (
            <Box className={styles.free_toResult}>
              <Button
              className={styles.free_toResultButton}
              onClick={handleResultToDB}
              >
                <TextSnippetIcon className={styles.free_toResultIcon} />
                <Typography className={notoSansJP.className}>
                  結果を確認
                </Typography>
              </Button>
            </Box>
          )
        }
    </Box>
    </>
  );
};

export default WordTest;