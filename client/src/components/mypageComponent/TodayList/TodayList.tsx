import React, { useState } from 'react';

//MUI
import {
    Box,
    Typography,
    Button,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

//MuiIcon
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

//CSS
import styles from './TodayList.module.scss';

//Font
import { notoSansJP } from '../../../utils/font';

//Type
import { WordDataType } from '@/types/globaltype';

//Utils
import { wordList } from '@/utils/words';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgb(240, 119, 49)',
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

const TodayList = () => {
    //本日分の単語の配列を取得
    const [todayWords, setTodayWords] = useState<WordDataType[]>([]);
    //現在のページを管理
    const [currentPage, setCurrentPage] = useState<number>(1)
    //本日分の単語の配列をコピーする
    const preSplitWords = [...todayWords];
    //フィルタリング後の配列を格納
    let splitWords: Array<WordDataType> = [];
    //ページあたりのアイテム数
    const perPageItemNum = 10;
    //最終ページを求める
    const lastPage = Math.ceil(todayWords.length / perPageItemNum)

    const sliceWords = (array: Array<WordDataType>, num: number) => {
        splitWords = preSplitWords.filter((word, index) => (
            index >= num * (currentPage - 1) && num * currentPage > index
        ));
    };

    const pageNext = () => {
        setCurrentPage((prev) => prev + 1)
    };

    const pagePrev = () => {
        setCurrentPage((prev) => prev - 1)
    };

    sliceWords(preSplitWords, perPageItemNum);

    return (
        <Box className={styles.home_thirdContents}>
            <Typography className={styles.home_wordListTitle}>
                本日の英単語一覧
            </Typography>
            {
                todayWords.length > 0 ? (
                    <>                    
                    <Box className={styles.home_todayWordList}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell className={notoSansJP.className} align='center'>単語番号</StyledTableCell>
                                        <StyledTableCell className={notoSansJP.className} align='center'>英単語</StyledTableCell>
                                        <StyledTableCell className={notoSansJP.className} align='center'>日本語訳</StyledTableCell>
                                        <StyledTableCell className={notoSansJP.className} align='center'>前回学習日</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        splitWords.map((word, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell
                                                align='center'
                                                className={notoSansJP.className}
                                                >
                                                    {word.id}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                align='center'
                                                className={notoSansJP.className}
                                                >
                                                    {word.english}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                align='center'
                                                className={notoSansJP.className}
                                                >
                                                    {word.japanese}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                align='center'
                                                className={notoSansJP.className}
                                                >
                                                    {word.date}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box className={styles.home_buttons}>
                        <Button
                        className={`${notoSansJP.className} ${styles.home_prev}`}
                        onClick={pagePrev}
                        disabled={
                            currentPage === 1 ? true : false
                        }
                        >
                            <NavigateBeforeIcon />
                        </Button>
                        <Button
                        className={`${notoSansJP.className} ${styles.home_next}`}
                        onClick={pageNext}
                        disabled={
                            currentPage === lastPage ? true : false
                        }
                        >
                            <NavigateNextIcon />
                        </Button>
                    </Box>
                    </>
                ) : (
                    <Typography className={notoSansJP.className}>
                        まずは単語を登録しましょう！
                    </Typography>
                )
            }
        </Box>
    )
};

export default TodayList;