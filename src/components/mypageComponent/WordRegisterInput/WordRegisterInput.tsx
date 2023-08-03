import React, { useState } from 'react';

//Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { dbWordsState, remainNumState, wordState, wordsState } from '@/store/mypageState';

//MUI
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper
} from '@mui/material';

//Font
import { notoSansJP } from '../../../utils/font';

//CSS
import styles from './WordRegisterInput.module.scss';

//Type
import { WordType, WordDataType } from '@/types/globaltype';

const WordRegisterInput = () => {
    //登録されているすべての単語を取得
    const dbWords = useRecoilValue<WordDataType[]>(dbWordsState);
    //登録リストに入っているすべての単語を取得
    const registerWords = useRecoilValue<WordDataType[]>(wordsState);
    
    const [words, setWords] = useRecoilState<WordDataType[]>(wordsState);
    const [remain, setRemain] = useRecoilState<number>(remainNumState);
    const [engField, setEngField] = useState('');
    const [japField, setJapField] = useState('');

    const handleWordsAdd = () => {
        const registerWord: WordDataType = {
            id: dbWords.length + registerWords.length + 1,
            english: engField,
            japanese: japField,
            date: createDate(),
            editing: false
        };

        //words配列に追加の単語を格納
        const preWords = [...words];
        const newWords = [...preWords, registerWord];
        setWords(newWords);

        setEngField('');
        setJapField('');
    };

    //テキストフィールドの監視
    const eWordTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEngField(e.target.value);
    };
    const jWordTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJapField(e.target.value);
    };

    //テキストフィールドの中身を監視
    const TextFieldLimit = (text: string, regular: RegExp) => {
        if (!text.match(regular)) return true;
        return false;
    };

    //日付の生成
    const createDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const today = date.getDate();

        let strYear = String(year);
        let strMonth = String(month);
        let strToday = String(today);

        if (month < 10) strMonth = '0' + strMonth;
        if (today < 10) strToday = '0' + strToday;

        return `${strYear}/${strMonth}/${strToday}`;
    }

    return (
        <Box className={styles.home_firstContents}>
            <Typography className={`${styles.home_wordRegisterTitle} ${notoSansJP.className}`}>
                英単語を登録
            </Typography>
            <Box className={styles.home_wordRegisterInputs} component={Paper}>
                <Box className={styles.home_RegisterEnglish}>
                    <TextField 
                    label="英単語"
                    required
                    className={notoSansJP.className}
                    fullWidth
                    onChange={eWordTextField}
                    value={engField}
                    />
                </Box>
                <Box className={styles.home_RegisterJapanese}>
                    <TextField 
                    label="日本語訳"
                    required
                    className={notoSansJP.className}
                    fullWidth
                    onChange={jWordTextField}
                    value={japField}
                    />
                </Box>
                <Box className={styles.home_wordRegisterWrapper}>
                    <Button
                    className={`${styles.home_wordRegister} ${notoSansJP.className}`}
                    onClick={handleWordsAdd}
                    disabled=
                    { 
                        remain === 0 || 
                        engField.length === 0 || 
                        japField.length === 0 ||
                        TextFieldLimit(engField, /^[a-zA-Z]*$/) ||
                        TextFieldLimit(japField, /^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠]*$/)
                        ? true : false 
                    }
                    >
                        登録リストに追加
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default WordRegisterInput;