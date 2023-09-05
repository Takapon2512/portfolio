import React, { useState } from 'react';

//MUI
import { 
    Box,
    Button,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

//MUIIcon
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

//CSS
import styles from "./WordList.module.scss";

//utils
import { notoSansJP } from '@/utils/font';

//type
import { WordDBType } from '@/types/globaltype';

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

const WordList = ({ minText, maxText, wordText, recordWords }: { 
        minText: string,
        maxText: string, 
        wordText: string, 
        recordWords: WordDBType[]
    }) => {

    //現在のページ番号を管理
    const [currentPage, setCurrentPage] = useState<number>(1);
    //1ページに表示する単語数
    const perPageItemNum = 10;
    //DBの単語を複製
    const wordsArr: Array<WordDBType> = [...recordWords];
    //stringをnumberに変換
    const minNum: number = Number(minText);
    const maxNum: number = Number(maxText);

    //単語番号で絞る
    const numWordsArr: Array<WordDBType> = wordsArr.filter((word: WordDBType, index: number) => 
        index >= minNum - 1 && maxNum - 1 >= index
    );

    //単語番号で絞ったあと、キーワードで絞る
    const keyWordsArr: Array<WordDBType> = numWordsArr.filter((word: WordDBType, index: number) => 
        word.english.includes(wordText)
    );

    //表示する単語を制限
    const sliceArr: Array<WordDBType> = keyWordsArr.filter((word, index) => (
        index >= (currentPage - 1) * perPageItemNum && currentPage * perPageItemNum > index
    ));

    //最後のページ番号を求める
    const lastPage: number = Math.ceil(keyWordsArr.length / perPageItemNum);
    
    return (
        <>        
        <Box className={styles.list}>
            <TableContainer sx={{ borderRadius: "4px" }}>
                <Table>
                    <TableHead sx={{border: "1px solid rgb(240, 119, 49)"}}>
                        <TableRow>
                            <StyledTableCell className={notoSansJP.className} align='center'>番号</StyledTableCell>
                            <StyledTableCell className={notoSansJP.className} align='center'>英単語</StyledTableCell>
                            <StyledTableCell className={notoSansJP.className} align='center'>日本語訳</StyledTableCell>
                            <StyledTableCell className={notoSansJP.className} align='center'>出題回数</StyledTableCell>
                            <StyledTableCell className={notoSansJP.className} align='center'>正答率</StyledTableCell>
                            <StyledTableCell className={notoSansJP.className} align='center'>前回学習日</StyledTableCell>
                            <StyledTableCell className={notoSansJP.className} align='center'>登録日</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{border: "1px solid rgb(217, 217, 217)"}}>
                        {
                            sliceArr.map((word: WordDBType, index: number) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell
                                    className={notoSansJP.className}
                                    align='center'
                                    >
                                        {word.user_word_id}
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
                                        {`${word.question_count} 回`}
                                    </StyledTableCell>
                                    <StyledTableCell
                                    className={notoSansJP.className}
                                    align='center'
                                    >
                                        {`${word.correct_rate} %`}
                                    </StyledTableCell>
                                    <StyledTableCell
                                    className={notoSansJP.className}
                                    align='center'
                                    >
                                        {
                                            word.last_time_at === null 
                                            ? ("未学習") 
                                            : (new Date(word.last_time_at).toLocaleDateString())
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell
                                    className={notoSansJP.className}
                                    align='center'
                                    >
                                        { new Date(word.created_at).toLocaleDateString() }
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        <Box className={styles.inputs_pageButtons}>
            <Button 
            className={styles.inputs_before}
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={ currentPage === 1 ? true : false }
            >
                <NavigateBeforeIcon />
            </Button>
            <Button 
            className={styles.inputs_next}
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={ currentPage === lastPage ? true : false }
            >
                <NavigateNextIcon />
            </Button>
        </Box>
        </>
    );
};

export default WordList;