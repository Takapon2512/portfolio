import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
import { WordDBType } from '@/types/globaltype';

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

const TestResult = ({ dbWords }: { dbWords: WordDBType[] }) => {
    //router
    const router = useRouter();

    //現在のページを管理
    const [currentPage, setCurrentPage] = useState<number>(1);

    //1ページに表示する単語数
    const perPageItemNum = 10;

    //問題の数を求める
    const questionWords: Array<WordDBType> = 
    dbWords.filter((word: WordDBType) => word.complete === true);
    const questionWordsNum: number = questionWords.length;

    //最終ページの番号を求める
    const lastPage: number = Math.ceil(questionWords.length / perPageItemNum);

    //一度に表示する単語を10個に制限する
    const sliceArr: Array<WordDBType> = questionWords.filter((word: WordDBType, index: number) => (
        index >= perPageItemNum * (currentPage - 1) 
        && perPageItemNum * currentPage > index 
    ));

    //正解した単語のみ取り出す
    const correctWords: Array<WordDBType> = questionWords.filter((word: WordDBType, index: number) => 
        word.right_or_wrong === true
    );
    const correctWordsNum: number = correctWords.length;

    //正答率を求める
    const correctRate: number = Math.round((correctWordsNum / questionWordsNum * 10) / 10) * 100;

    //結果を確認した後のボタン
    const handleNextAction = () => {
        if (correctRate === 100) {
            

            router.push("/mypage");
        } else {
            router.push("/mypage/free/test");
        }
    };

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
                                                {word.user_answer}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                className={notoSansJP.className}
                                                align='center'
                                                sx={
                                                    word.right_or_wrong ? 
                                                    { color: "rgb(48, 48, 48)"} : { color: "rgb(236, 75, 18)"}
                                                }
                                            >
                                                {word.right_or_wrong ? "正解" : "誤答"}
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
                onClick={handleNextAction}
                >
                    {
                        correctRate < 100 
                        ? ( <QuizIcon className={styles.free_resultButtonIcon} /> ) 
                        : ( <HomeIcon className={styles.free_resultButtonIcon} /> )
                    }
                    <Typography className={notoSansJP.className}>
                        { correctRate < 100 ? "再テストを行う" : "ホームに戻る" }
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default TestResult;