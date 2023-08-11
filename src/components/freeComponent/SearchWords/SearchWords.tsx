import React, { useEffect, useState } from 'react';

//recoil
import { useRecoilValue } from 'recoil';
import { dbWordsState } from '@/store/mypageState';

//MUI
import { 
    Box,
    Typography,
    TextField,
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
} from '@mui/material';

//MuiIcon
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
  
//CSS
import styles from './SearchWords.module.scss';
import { notoSansJP } from '@/utils/font';

//type
import { WordDataType } from '@/types/globaltype';

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

const SearchWords = () => {
    //dbの単語リストを取得
    const dbWords = useRecoilValue<WordDataType[]>(dbWordsState);
    //単語の数を求める
    const dbWordsLength: string = String(dbWords.length);

    //テキストフィールドの監視
    const [minText, setMinText] = useState<string>("1");
    const [maxText, setMaxText] = useState<string>(dbWordsLength);
    const [keyword, setKeyword] = useState<string>("");

    //単語番号をnumber型にする
    const numMin: number = Number(minText);
    const numMax: number = Number(maxText);

    //現在のページ番号を管理
    const [currentPage, setCurrentPage] = useState<number>(1);

    //1ページに表示する単語数
    const perPageItemNum = 10;
    //最後のページ番号を求める
    const lastPage: number = Math.ceil(dbWords.length / perPageItemNum); 

    //テキストフィールドを監視
    const handleMinText = (e: React.ChangeEvent<HTMLInputElement>) => setMinText(minusToPlus(e));
    const handleMaxText = (e: React.ChangeEvent<HTMLInputElement>) => setMaxText(minusToPlus(e));
    const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);

    //マイナスの値が入力されたとき、-1倍する
    const minusToPlus = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numText: number = Number(e.target.value);
        if (numText < 0) numText *= -1;
        return String(numText);
    };

    //リセットボタン
    const resetButton = () => {
        setMinText("1");
        setMaxText(dbWordsLength);
    };

    //検索ボタンをdisabledにするかを判定
    const disabledJudge = () => {
        if (numMin > numMax) return true;
        if (!keyword.match(/^[a-zA-Z]*$/)) return true;

        return false;
    };

    const wordsArr: Array<WordDataType> = [...dbWords];
    
    //単語番号で絞る
    const numWordsArr: Array<WordDataType> = wordsArr.filter((word: WordDataType, index: number) => (
        index >= perPageItemNum * (currentPage - 1) && perPageItemNum * currentPage > index
    ));

    //単語番号で絞った後、キーワードで絞る
    const keyWordsArr: Array<WordDataType> = numWordsArr.filter((word: WordDataType, index: number) => (
        word.english.includes(keyword)
    ));

    return (
        <Box className={styles.firstContents}>
            <Typography className={styles.free_searchTitle}>
                単語を検索する
            </Typography>
            <Box className={styles.free_searchInputs} component={Paper}>
                <Box className={styles.free_searchNumber}>
                    <TextField 
                    label="最初の単語番号"
                    type='number'
                    className={styles.free_searchNumMin}
                    value={minText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMinText(e)}
                    />
                    <Typography className={styles.free_searchNumberMiddle}>
                        ～
                    </Typography>
                    <TextField 
                    label="最後の単語番号"
                    type='number'
                    className={styles.free_searchNumMax}
                    value={maxText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMaxText(e)}
                    />
                </Box>
                <Box className={styles.free_searchKeyword}>
                    <TextField 
                    label="英単語で検索"
                    fullWidth
                    value={keyword}
                    onChange={handleKeyword}
                    />
                </Box>
                <Box className={styles.free_searchButtons}>
                    <Button
                    className={`${notoSansJP.className} ${styles.free_search}`}
                    disabled={disabledJudge()}
                    >
                        検索
                    </Button>
                    <Button
                    className={`${notoSansJP.className} ${styles.free_reset}`}
                    onClick={resetButton}
                    >
                        リセット
                    </Button>
                </Box>
                <Box className={styles.free_searchList}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className={notoSansJP.className} align='center'>単語番号</StyledTableCell>
                                    <StyledTableCell className={notoSansJP.className} align='center'>英単語</StyledTableCell>
                                    <StyledTableCell className={notoSansJP.className} align='center'>日本語</StyledTableCell>
                                    <StyledTableCell className={notoSansJP.className} align='center'>ステータス</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    keyWordsArr.map((word, index) => (
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
                                                {word.register}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                    <Box className={styles.free_registerButtons}>
                        <Button
                        className={`${notoSansJP.className} ${styles.free_register}`}
                        >
                            登録
                        </Button>
                        <Button
                        className={`${notoSansJP.className} ${styles.free_all}`}
                        >
                            すべて出題
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SearchWords;