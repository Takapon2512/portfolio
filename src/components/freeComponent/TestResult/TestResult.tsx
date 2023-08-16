import React from 'react';

//recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { dbWordsState } from '@/store/mypageState';

//MUI
import{
    Box,
    Typography,
    Button,
    Paper,
    TextField,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

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
    },
    '&:hover': {
        cursor: "pointer",
        backgroundColor: "rgb(224, 224, 224)"
    }
}));

const TestResult = () => {
    const jsonCorrectNum: string = localStorage.getItem("correct") || "";
    const correctNum: number = Number(jsonCorrectNum);

    //問題の数を求める
    const dbWords = useRecoilValue<WordDataType[]>(dbWordsState);
    const questionWords: Array<WordDataType> = 
    dbWords.filter((word: WordDataType) => word.register.match(/^出題$/));
    const questionWordsNum: number = questionWords.length;
    console.log(questionWords);

    return (
        <Box className={styles.free_firstContents}>
            <Typography className={`${notoSansJP.className} ${styles.free_resultTitle}`}>
                確認テストの結果
            </Typography>
            <Paper className={styles.free_resultDisplay}>
                <Typography className={`${notoSansJP.className} ${styles.free_correctRateTitle}`}>
                    あなたの正答率は...
                </Typography>
                <Box className={styles.free_resultDisplayContainer}>
                    <CircularResultLabel correct={correctNum} questionNum={questionWordsNum} />
                </Box>
            </Paper>
            <Paper className={styles.free_resultDetail}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>単語番号</StyledTableCell>
                                <StyledTableCell align='center'>英単語</StyledTableCell>
                                <StyledTableCell align='center'>日本語</StyledTableCell>
                                <StyledTableCell align='center'>正誤</StyledTableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default TestResult;