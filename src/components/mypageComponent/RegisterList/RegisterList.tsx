import React, { useEffect, useState } from 'react';

//Recoil
import { useRecoilState, useSetRecoilState } from 'recoil';
import { remainNumState, wordsState } from '@/store/mypageState';

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
    Paper,
    TextField
} from '@mui/material';

//Font
import { notoSansJP } from '../../../utils/font';

//CSS
import styles from './RegisterList.module.scss';
import { WordDataType } from '@/types/globaltype';

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
    },
    [`&.${tableCellClasses.body}:not(:first-of-type):hover`]: {
        cursor: 'pointer',
        backgroundColor: 'rgb(231, 231, 231)',
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const RegisterList = () => {
    const [registerWords, setRegisterWords] = 
    useRecoilState<WordDataType[]>(wordsState);
    const setRemainNum = useSetRecoilState<number>(remainNumState);

    
    //編集モードの制御（編集モードにできるのは1つの単語のみにする）
    const [editing, setEditing] = useState<boolean>(false);
    
    const [editWord, setEditWord] = useState<WordDataType>({
        id: 0,
        english: '',
        japanese: '',
        date: '',
        editing: false
    });
    const [editWordIndex, setEditWordIndex] = useState<number>(0);
    
    //登録可能数を求める
    const registerWordsMax = 10;
    const remain = registerWordsMax - registerWords.length;
    
    //編集テキストの制御
    const [editEngText, setEditEngText] = useState<string>('');
    const [editJapText, setEditJapText] = useState<string>('');

    //登録リストを削除
    const RegisterListDelete = () => setRegisterWords([]);

    //編集モードにする 
    const handleWordEditing = (word: WordDataType, index: number) => {
        if (editing !== true) {
            const wordsArr: Array<WordDataType> = [...registerWords];
            const prevWord: WordDataType = word;
            const newWord: WordDataType = {
                ...prevWord,
                editing: true
            };
    
            wordsArr[index] = newWord;
    
            setRegisterWords(wordsArr);
            setEditing(true);

            //現在の内容を編集モードのテキストフィールドに渡す
            setEditEngText(word.english);
            setEditJapText(word.japanese);
    
            //mapの外でもwordとindexを参照できるようにする
            setEditWord(word);
            setEditWordIndex(index);
        };
    };

    //編集を完了
    const handleEditEnd = () => {
        const wordsArr: Array<WordDataType> = [...registerWords];
        const prevWord: WordDataType = editWord;
        const newWord: WordDataType = {
            ...prevWord,
            english: editEngText,
            japanese: editJapText,
            editing: false
        };

        wordsArr[editWordIndex] = newWord;

        setRegisterWords(wordsArr);
        setEditing(false);
    };

    //編集モードの単語を削除する
    const RegisterWordDelete = (index: number) => {
        const wordsArr: Array<WordDataType> = [...registerWords];
        
        const wordsMinId: number = wordsArr[0].id;
        wordsArr.splice(index, 1);

        //欠番が生じる可能性があるため、単語番号をふり直す
        const prevWordsArr: Array<WordDataType> = wordsArr;
        const newWordsArr: Array<WordDataType> = 
        prevWordsArr.map((word: WordDataType, num: number) => ({
            ...word,
            id: wordsMinId + num
        }));

        setRegisterWords(newWordsArr);
        setEditing(false);
    };

    //テキストフィールドの中身を監視
    const TextFieldLimit = (text: string, regular: RegExp) => {
        if (!text.match(regular)) return true;
        return false;
    };

    useEffect(() => {
        setRemainNum(remain);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remain]);

    return (
        <>
        {
            remain < registerWordsMax ? (
                <Box className={styles.home_secondContents}>
                <Box className={styles.home_titleWrapper}>
                    <Typography 
                    className={`${styles.home_wordListTitle} ${notoSansJP.className}`}>
                        登録リスト
                    </Typography>
                    <Box className={styles.home_remainWrapper}>
                        <Typography className={`${styles.home_remainRegister} ${notoSansJP.className}`}>
                            登録できる数
                        </Typography>
                        <Typography className={`${styles.home_remainNumber} ${notoSansJP.className}`}>
                            {remain} / 10
                        </Typography>
                    </Box>
                </Box>
                <Box className={styles.home_wordRegisterList}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className={notoSansJP.className} align='center'>単語番号</StyledTableCell>
                                    <StyledTableCell className={notoSansJP.className} align='center'>英単語</StyledTableCell>
                                    <StyledTableCell className={notoSansJP.className} align='center'>日本語訳</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    registerWords.map((word: WordDataType, index: number) => (
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
                                            onClick={() => handleWordEditing(word, index)}
                                            >
                                                {
                                                    word.editing ? (
                                                        <TextField
                                                        value={editEngText}
                                                        className={`${notoSansJP.className} ${styles.home_editTextField}`}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                                            setEditEngText(e.target.value)}
                                                        />
                                                    ) : (
                                                        <Typography>
                                                            {word.english}
                                                        </Typography>
                                                    )
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell 
                                            align='center'
                                            className={notoSansJP.className}
                                            onClick={() => handleWordEditing(word, index)}
                                            >
                                                {
                                                    word.editing ? (
                                                        <TextField
                                                        value={editJapText}
                                                        className={`${notoSansJP.className} ${styles.home_editTextField}`}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                                            setEditJapText(e.target.value)}
                                                        />
                                                    ) : (
                                                        <Typography>
                                                            {word.japanese}
                                                        </Typography>
                                                    )
                                                }
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box className={styles.home_registerButtonWrapper}>
                    {
                        editing ? (
                            <>                           
                            <Button
                            className={`${styles.home_registerButton} ${notoSansJP.className}`}
                            onClick={handleEditEnd}
                            disabled={
                                editEngText.length === 0 ||
                                editJapText.length === 0 ||
                                TextFieldLimit(editEngText, /^[a-zA-Z]*$/) ||
                                TextFieldLimit(editJapText, /^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠]*$/) 
                                ? true : false
                            }
                            >
                                完了
                            </Button>
                            <Button
                            className={`${styles.home_deleteButton} ${notoSansJP.className}`}
                            onClick={() => RegisterWordDelete(editWordIndex)}
                            >
                                単語削除
                            </Button>
                            </>
                        ) : (
                            <>                            
                            <Button
                            className={`${styles.home_registerButton} ${notoSansJP.className}`}
                            >
                                本登録
                            </Button>
                            <Button
                            className={`${styles.home_deleteButton} ${notoSansJP.className}`}
                            onClick={RegisterListDelete}
                            >
                                リスト削除
                            </Button>
                            </>
                        )
                    }
                </Box>
                </Box>
            ) : (<></>)
        }        
        </>
    )
};

export default RegisterList;