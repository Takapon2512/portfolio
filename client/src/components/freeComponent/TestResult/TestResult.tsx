import React, { useState } from 'react';
import { useRouter } from 'next/router';

//recoil
import { useRecoilValue } from 'recoil';
import { dbWordsState } from '@/store/mypageState';

//MUI
import{
    Box,
    Typography,
    Button,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

//MUIIcon
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import QuizIcon from '@mui/icons-material/Quiz';
import HomeIcon from '@mui/icons-material/Home';

//CSS
import styles from "./TestResult.module.scss";

//Types
import { WordDataType } from '@/types/globaltype';

//utils
import { notoSansJP } from '@/utils/font';

//Components
import CircularResultLabel from '@/components/CircularProgressWithLabel/CircularResultLabel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgb(184, 184, 184)',
        color: theme.palette.common.white,
        fontSize: 16,
        paddingTop: 12,
        paddingBottom: 12
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        paddingTop: 12,
        paddingBottom: 12
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    }
}));

const TestResult = () => {
    //router
    const router = useRouter();

    //現在のページを管理
    const [currentPage, setCurrentPage] = useState<number>(1);

    //1ページに表示する単語数
    const perPageItemNum = 10;

    //問題の数を求める
    const dbWords = useRecoilValue<WordDataType[]>(dbWordsState);
    const questionWords: Array<WordDataType> = 
    dbWords.filter((word: WordDataType) => word.register.match(/^出題$/));
    const questionWordsNum: number = questionWords.length;
    console.log(questionWords);

    //最終ページの番号を求める
    const lastPage: number = Math.ceil(questionWords.length / perPageItemNum);

    //一度に表示する単語を10個に制限する
    const sliceArr: Array<WordDataType> = questionWords.filter((word: WordDataType, index: number) => (
        index >= perPageItemNum * (currentPage - 1) 
        && perPageItemNum * currentPage > index 
    ));

    //正解した単語のみ取り出す
    const correctWords: Array<WordDataType> = questionWords.filter((word: WordDataType, index: number) => 
        word.rightWrong === true
    );
    const correctWordsNum: number = correctWords.length;
    console.log(correctWordsNum);

    //正答率を求める
    const correctsRate: number = Math.ceil(correctWordsNum / questionWordsNum * 100);
    console.log(correctsRate);

    return (
        <Box className={styles.free_firstContents}>
            <Typography className={`${notoSansJP.className} ${styles.free_resultTitle}`}>
                確認テストの結果
            </Typography>
            <Box className={styles.free_resultDisplay}>
                <Typography className={`${notoSansJP.className} ${styles.free_correctRateTitle}`}>
                    あなたの正答率は...
                </Typography>
                <Box className={styles.free_resultDisplayContainer}>
                    <CircularResultLabel correct={correctWordsNum} questionNum={questionWordsNum} />
                </Box>
                <Box className={styles.free_resultDetail}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>単語番号</StyledTableCell>
                                    <StyledTableCell align='center'>英単語</StyledTableCell>
                                    <StyledTableCell align='center'>日本語訳</StyledTableCell>
                                    <StyledTableCell align='center'>あなたの解答</StyledTableCell>
                                    <StyledTableCell align='center'>正誤</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    sliceArr.map((word, index) => (
                                        <StyledTableRow
                                        key={index}
                                        >
                                            <StyledTableCell
                                            className={notoSansJP.className}
                                            align='center'
                                            >
                                                {word.id}
                                            </StyledTableCell>
                                            <StyledTableCell
                                            className={notoSansJP.className}
                                            align='center'
                                            >
                                                {word.english}
                                            </StyledTableCell>
                                            <StyledTableCell
                                            className={notoSansJP.className}
                                            align='center'
                                            >
                                                {word.japanese}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                className={notoSansJP.className}
                                                align='center'
                                            >
                                                {word.yourAnswer}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                className={notoSansJP.className}
                                                align='center'
                                                sx={
                                                    word.rightWrong ? 
                                                    { color: "rgb(48, 48, 48)"} : { color: "rgb(236, 75, 18)"}
                                                }
                                            >
                                                {word.rightWrong ? "正解" : "誤答"}
                                            </StyledTableCell>                                          
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box className={styles.free_pageButtons}>
                    <Button 
                    className={styles.free_before}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={ currentPage === 1 ? true : false }
                    >
                        <NavigateBeforeIcon />
                    </Button>
                    <Button 
                    className={styles.free_next}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={ currentPage === lastPage ? true : false }
                    >
                        <NavigateNextIcon />
                    </Button>
                </Box>
            </Box>
            <Box className={styles.free_resultButtonWrapper}>
                <Button 
                className={styles.free_resultButton}
                onClick={() => correctsRate !== 100 ? (router.push("/mypage/free/test")) : (router.push("/mypage")) }
                >
                    {
                        correctsRate < 100 
                        ? ( <QuizIcon className={styles.free_resultButtonIcon} /> ) 
                        : ( <HomeIcon className={styles.free_resultButtonIcon} /> )
                    }
                    <Typography className={notoSansJP.className}>
                        { correctsRate < 100 ? "再テストを行う" : "ホームに戻る" }
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default TestResult;