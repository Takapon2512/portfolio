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
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

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
  //正答数
  const [correctNum, setCorrectNum] = useState<number>(0);
  
  //出題状態の単語のみを取得
  const questionWords: Array<WordDataType> = 
  dbWords.filter((word: WordDataType) => word.register.match(/^出題$/));

  //idから問題番号を求める
  let numArr: Array<number> = questionWords.map((word) => word.id - questionWords[0].id);

  numArr.forEach((item: number, index: number) => {
    //ランダムな数値(0 <= index <= index + 1)を取得する
    let randomNum = Math.floor(Math.random() * (index + 1));

    //要素を一時的に保管する
    let tmp: number = numArr[index];

    //要素の保管場所を入れ替える
    numArr[index] = numArr[randomNum];
    numArr[randomNum] = tmp;
  });

  const [intNum, setIntNum] = useState<number[]>(numArr);

  //解答欄の内容を日本語に限定する
  const answerTextDisabled = () => {
    if (!answerText.match(/^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠、々]*$/) || answerText === "") return true;
    return false;
  };

  //解答ボタンを押したとき
  const handleAnswer = () => {
    const currentNum: number = problemNum;
    if (questionWords[intNum[problemNum - 1]].japanese === answerText) {
      console.log("正解");
      setCorrectNum(prev => prev + 1);
      localStorageStore();
    } else {
      console.log("不正解");
    }
    setProblemNum(currentNum + 1);
    setAnswerText("");
  };

  //パスボタンを押したとき
  const handlePass = () => setProblemNum(prev => prev + 1);

  //問題の表示
  const englishDisplay = () => {
    if (problemNum > questionWords.length) {
      return "お疲れ様でした";
    };
    return questionWords[intNum[problemNum - 1]].english;
  };

  //Enterキーを押したとき
  // const handleEnterAnswer = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (e.key === "Enter" && answerText.match(/^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠、々]*$/)) {
  //     const currentNum: number = problemNum;
  //     if (questionWords[currentNum - 1].japanese === answerText) {
  //       console.log("正解");
  //     } else {
  //       console.log("不正解");
  //     }
  //     setProblemNum(currentNum + 1);
  //     setAnswerText("");
  //   };
  // };

  const localStorageStore = () => {
    const jsonCorrectNum: string = JSON.stringify(correctNum);
    localStorage.setItem("correct", jsonCorrectNum);
  };

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
        </Paper>
        {
          problemNum <= questionWords.length ? (
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
              onClick={() => router.push("/mypage/free/result")}
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