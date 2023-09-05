import React, { useState } from 'react';
import { useRouter, NextRouter } from 'next/router';

//recoil
import { useSetRecoilState } from 'recoil';
import { WordsState } from '@/store/freePageState';

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

//MUIIcon
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
  
//CSS
import styles from './SearchWords.module.scss';

//utils
import { notoSansJP } from '@/utils/font';

//type
import { WordDataType, WordDBType } from '@/types/globaltype';

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

const SearchWords = ({ dbWords }: { dbWords: WordDBType[] }) => {
    //Router
    const router: NextRouter = useRouter();

    //テキストフィールドの監視
    const [minText, setMinText] = useState<string>("1");
    const [maxText, setMaxText] = useState<string>(`${dbWords.length}`);
    const [keyword, setKeyword] = useState<string>("");

    //単語番号をnumber型にする
    const numMin: number = Number(minText);
    const numMax: number = Number(maxText);

    //現在のページ番号を管理
    const [currentPage, setCurrentPage] = useState<number>(1);

    //苦手度ボタンの切り替えを管理
    const [isActive, setIsActive] = useState<weakButtonType>({
        weak: false,
        normal: false,
        good: false
    });

    //1ページに表示する単語数
    const perPageItemNum = 10;

    //データベースに入っている単語配列を複製
    const wordsArr: Array<WordDBType> = [...dbWords];
    //取得したデータを型「WordDataType」にする
    const newWordsArr: Array<WordDataType> = wordsArr.map((word: WordDBType) => (
        { ...word, question_register: "出題しない", editing: false }
    ));
    const [wordDataWords, setWordDataWords] = useState<WordDataType[]>([...newWordsArr]);
    const setRecoilWords = useSetRecoilState<WordDataType[]>(WordsState);

    //単語番号で絞る
    const numWordsArr: Array<WordDataType> = wordDataWords
        .filter((word: WordDataType) => 
        word.user_word_id >= numMin  && numMax >= word.user_word_id);

    //正答率の基準
    const normalBorder = 60;
    const goodBorder = 80;

    //単語番号で絞った後、苦手度で絞る
    const weakWordsArr: Array<WordDataType> = numWordsArr.filter((word: WordDataType, index: number) => {
        if (word.correct_rate !== null) {
            if (isActive.weak) {
                return word.correct_rate < normalBorder;
            } else if (isActive.normal) {
                return word.correct_rate >= normalBorder && goodBorder > word.correct_rate;
            } else if (isActive.good) {
                return word.correct_rate >= goodBorder;
            }
            return word.correct_rate >= 0 && 100 >= word.correct_rate;
        };
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
            wordsArr.filter((word: WordDataType) => word.question_register === "出題しない");
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
        const wordsArr: Array<WordDataType> = [...wordDataWords];
        const prevWord: WordDataType = word;
        const dbWordsIndex: number = word.user_word_id - 1;

        const newWord: WordDataType = 
        word.question_register === "出題" 
        ? { ...prevWord, question_register: "出題しない" }
        : { ...prevWord, question_register: "出題" };

        wordsArr[dbWordsIndex] = newWord;
        setWordDataWords(wordsArr);
        setRecoilWords(wordsArr);
    };

    //「すべて出題」ボタンを押すとステータスを「出題」にし、「すべて出題しない」ボタンを押すとステータスを「出題しない」にする
    const handleAllStatusChange = () => {
        const prevQuestions: Array<WordDataType> = [...keyWordsArr];
        const newQuestions: Array<WordDataType> = prevQuestions.map((word: WordDataType) => (
            statusNotAskJudge(wordDataWords) ?
            { ...word, question_register: "出題" } : { ...word, question_register: "出題しない" }
    ));
        setWordDataWords(newQuestions);
        setRecoilWords(newQuestions);
    };

    //「暗記する」ボタンを押したとき
    const registerButton = () => router.push("/mypage/free/wordcard");

    const registerButtonDisabed = () => {
        const questonArr: Array<WordDataType> = wordDataWords
            .filter((word: WordDataType) => word.question_register === "出題");
        if (questonArr.length === 0) return true;
        return false;
    };
    
    const handleWeakButton = () => {
        const newObj: weakButtonType = isActive.weak 
        ? { weak: false, normal: false, good: false } : { weak: true, normal: false, good: false };
        setIsActive(newObj);
        setCurrentPage(1);
    };

    const handleNormalButton = () => {
        const newObj: weakButtonType = isActive.normal
        ? { weak: false, normal: false, good: false } : { weak: false, normal: true, good: false };
        setIsActive(newObj);
        setCurrentPage(1);
    };

    const handleGoodButton = () => {
        const newObj: weakButtonType = isActive.good
        ? { weak: false, normal: false, good: false } : { weak: false, normal: false, good: true };
        setIsActive(newObj);
        setCurrentPage(1);
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setMinText(e.target.value); setCurrentPage(1)}}
                    />
                    <Typography className={`${styles.free_searchNumberMiddle} ${notoSansJP.className}`}>
                        ～
                    </Typography>
                    <TextField 
                    label="最後の単語番号"
                    type='number'
                    className={styles.free_searchNumMax}
                    value={maxText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setMaxText(e.target.value); setCurrentPage(1)}}
                    />
                </Box>
                <Box className={styles.free_searchKeyword}>
                    <TextField 
                    label="英単語で検索"
                    fullWidth
                    value={keyword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setKeyword(e.target.value); setCurrentPage(1)}}
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
                                                        {`${word.correct_rate} %`}
                                                    </StyledTableCell>
                                                    <StyledTableCell
                                                    className={notoSansJP.className}
                                                    align='center'
                                                    >
                                                        {word.question_register}
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