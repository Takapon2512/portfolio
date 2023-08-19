import React, { useState } from 'react';
import { useRouter, NextRouter } from 'next/router';

//recoil
import { useRecoilState } from 'recoil';
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
    },
    '&:hover': {
        cursor: "pointer",
        backgroundColor: "rgb(224, 224, 224)"
    }
}));

interface weakButtonType {
    weak: boolean,
    normal: boolean,
    good: boolean
}

const SearchWords = () => {
    //Router
    const router: NextRouter = useRouter();

    //DBの単語リストを取得
    const [dbWords, setDBWords] = useRecoilState<WordDataType[]>(dbWordsState);
    //DB内の単語の数を求める
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

    //苦手度ボタンの切り替えを管理
    const [isActive, setIsActive] = useState<weakButtonType>({
        weak: true,
        normal: false,
        good: false
    });

    //1ページに表示する単語数
    const perPageItemNum = 10;

    //データベースに入っている単語配列を複製
    const wordsArr: Array<WordDataType> = [...dbWords];
    
    //単語番号で絞る
    const numWordsArr: Array<WordDataType> = wordsArr
        .filter((word: WordDataType, index: number) => 
        index >= numMin - 1 && numMax - 1 >= index);

    //正答率の基準
    const normalBorder = 60;
    const goodBorder = 80;

    //単語番号で絞った後、苦手度で絞る
    const weakWordsArr: Array<WordDataType> = numWordsArr.filter((word: WordDataType, index: number) => {
        if (isActive.weak) {
            return word.correctRate < normalBorder;
        } else if (isActive.normal) {
            return word.correctRate >= normalBorder && goodBorder > word.correctRate;
        } else if (isActive.good) {
            return word.correctRate >= goodBorder;
        }
        return word.correctRate >= 0 && 100 >= word.correctRate;
    });

    //苦手度で絞った後、キーワードで絞る
    const keyWordsArr: Array<WordDataType> = weakWordsArr
        .filter((word: WordDataType, index: number) => 
        word.english.includes(keyword));


    //最後のページ番号を求める
    const lastPage: number = Math.ceil(keyWordsArr.length / perPageItemNum); 

    //sliceArr配列のステータスに「出題しない」が1つでもあるかを判定
    const statusNotAskJudge = (wordsArr: WordDataType[]) => {
        const notAskArr: Array<WordDataType> = 
            wordsArr.filter((word: WordDataType) => word.register.includes("出題しない"));
        if (notAskArr.length > 0) return true;
        return false;
    };

    //一度に表示する単語を10個に制限する
    const sliceArr: Array<WordDataType> = keyWordsArr.filter((word: WordDataType, index: number) => (
        index >= perPageItemNum * (currentPage - 1) 
        && perPageItemNum * currentPage > index 
    ));

    //ステータスを切り替える
    const handleChangeStatus = (word: WordDataType) => {
        const wordsArr: Array<WordDataType> = [...dbWords];
        const prevWord: WordDataType = word;
        const dbWordsIndex: number = word.id - 1;

        if (word.register === "出題しない") {
            const newWord: WordDataType = {
                ...prevWord,
                register: "出題"
            };
            wordsArr[dbWordsIndex] = newWord;
        } else if (word.register === "出題") {
            const newWord: WordDataType = {
                ...prevWord,
                register: "出題しない"
            };
            wordsArr[dbWordsIndex] = newWord;
        };

        setDBWords(wordsArr);
    };

    //「すべて出題」ボタンを押すとステータスを「出題」にし、「すべて出題しない」ボタンを押すとステータスを「出題しない」にする
    const handleAllStatusChange = () => {
        const dbWordsArr: Array<WordDataType> = [...dbWords];
        const sliceWordsArr: Array<WordDataType> = [...sliceArr];
        const newSliceWordsArr: Array<WordDataType> = sliceWordsArr.map((word: WordDataType) => (
            { ...word, register: "出題" }
        ));

        const firstIndex = newSliceWordsArr[0].id - 1;
        const lastIndex = newSliceWordsArr[sliceWordsArr.length - 1].id - 1;

        if (statusNotAskJudge(sliceArr) === true) {
            const newDBWordsArr: Array<WordDataType> = dbWordsArr.map((word: WordDataType, index: number) => 
                (word.id - 1 === index && index >= firstIndex && lastIndex >= index) 
                ? { ...word, register: "出題"} : { ...word });
            setDBWords(newDBWordsArr);
        } else {
            const newDBWordsArr: Array<WordDataType> = dbWordsArr.map((word: WordDataType, index: number) => 
                (word.id - 1 === index && index >= firstIndex && lastIndex >= index) 
                ? { ...word, register: "出題しない" } : { ...word });
            setDBWords(newDBWordsArr);
        };
    };

    //「暗記する」ボタンを押したとき
    const registerButton = () => router.push("/mypage/free/wordcard");

    const registerButtonDisabed = () => {
        const questonArr: Array<WordDataType> = wordsArr.filter((word: WordDataType) => word.register === "出題");
        if (questonArr.length === 0) return true;
        return false;
    };
    
    const handleWeakButton = () => {
        const newObj: weakButtonType = isActive.weak 
        ? { weak: false, normal: false, good: false } : { weak: true, normal: false, good: false };
        setIsActive(newObj);
    };

    const handleNormalButton = () => {
        const newObj: weakButtonType = isActive.normal
        ? { weak: false, normal: false, good: false } : { weak: false, normal: true, good: false };
        setIsActive(newObj);
    };

    const handleGoodButton = () => {
        const newObj: weakButtonType = isActive.good
        ? { weak: false, normal: false, good: false } : { weak: false, normal: false, good: true };
        setIsActive(newObj);
    };

    return (
        <>        
        <Box className={styles.free_firstContents}>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinText(e.target.value)}
                    />
                    <Typography className={styles.free_searchNumberMiddle}>
                        ～
                    </Typography>
                    <TextField 
                    label="最後の単語番号"
                    type='number'
                    className={styles.free_searchNumMax}
                    value={maxText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxText(e.target.value)}
                    />
                </Box>
                <Box className={styles.free_searchKeyword}>
                    <TextField 
                    label="英単語で検索"
                    fullWidth
                    value={keyword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                    />
                </Box>
                <Box className={styles.free_correctRateButtons}>
                    <Typography className={notoSansJP.className}>
                        苦手度で検索：
                    </Typography>
                    <Box className={styles.free_correctRateButtonsContainer}>
                        <Button 
                        className={`${notoSansJP.className} ${styles.free_weakButton}`}
                        sx={
                            isActive.weak ? ({
                                backgroundColor: "rgb(241, 39, 39)",
                                color: "#fff !important",
                                border: "1px solid transparent !important",
                            }) : ({})
                        }
                        onClick={handleWeakButton}
                        >
                            苦手
                        </Button>
                        <Button 
                        className={`${notoSansJP.className} ${styles.free_normalButton}`}
                        sx={
                            isActive.normal ? ({
                                backgroundColor: "rgb(240, 119, 49)",
                                color: "#fff !important",
                                border: "1px solid transparent !important",
                            }) : ({})
                        }
                        onClick={handleNormalButton}
                        >
                            まずまず
                        </Button>
                        <Button 
                        className={`${notoSansJP.className} ${styles.free_goodButton}`}
                        sx={
                            isActive.good ? ({
                                backgroundColor: "rgb(60, 123, 239)",
                                color: "#fff !important",
                                border: "1px solid transparent !important",
                            }) : ({})
                        }
                        onClick={handleGoodButton}
                        >
                            得意
                        </Button>
                    </Box>
                </Box>
                {
                    sliceArr.length !== 0 ? (                        
                        <Box className={styles.free_searchList}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell className={notoSansJP.className} align='center'>単語番号</StyledTableCell>
                                            <StyledTableCell className={notoSansJP.className} align='center'>英単語</StyledTableCell>
                                            <StyledTableCell className={notoSansJP.className} align='center'>日本語訳</StyledTableCell>
                                            <StyledTableCell className={notoSansJP.className} align='center'>正答率</StyledTableCell>
                                            <StyledTableCell className={notoSansJP.className} align='center'>ステータス</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            sliceArr.map((word: WordDataType, index: number) => (
                                                <StyledTableRow 
                                                key={index}
                                                onClick={() => handleChangeStatus(word)}
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
                                                        {`${word.correctRate} %`}
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
                                onClick={registerButton}
                                disabled={registerButtonDisabed()}
                                >
                                    暗記する
                                </Button>
                                {
                                    statusNotAskJudge(sliceArr) ? (
                                        <Button
                                        className={`${notoSansJP.className} ${styles.free_all}`}
                                        onClick={handleAllStatusChange}
                                        >
                                            すべて出題
                                        </Button>
                                    ) : (
                                        <Button
                                        className={`${notoSansJP.className} ${styles.free_all}`}
                                        onClick={handleAllStatusChange}
                                        >
                                            すべて出題しない
                                        </Button>
                                    )
                                }
                            </Box>
                        </Box>
                    ) : (
                        <Typography align='center' className={notoSansJP.className}>
                            一致する単語が見つかりませんでした。
                        </Typography>
                    )
                }
            </Box>

        </Box>
        </>
    );
};

export default SearchWords;