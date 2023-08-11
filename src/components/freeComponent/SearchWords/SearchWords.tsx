import React, { useState } from 'react';

//recoil
import { useRecoilValue} from 'recoil';
import { dbWordsState } from '@/store/mypageState';

//MUI
import { 
    Box,
    Typography,
    TextField,
    Button,
    Paper
} from '@mui/material';
  
//CSS
import styles from './SearchWords.module.scss';
import { notoSansJP } from '@/utils/font';

//type
import { WordDataType } from '@/types/globaltype';
import { number } from 'yup';


const SearchWords = () => {
    //dbの単語リストを取得
    const dbWords = useRecoilValue<WordDataType[]>(dbWordsState);
    //単語の数を求める
    const dbWordsLength: string = String(dbWords.length);

    //テキストフィールドの監視
    const [minText, setMinText] = useState<string>("1");
    const [maxText, setMaxText] = useState<string>(dbWordsLength);
    const [keyword, setKeyword] = useState<string>("");

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
        //単語番号のテキストフィールドをリセット
        setMinText("1");
        setMaxText(dbWordsLength);

    };

    //検索ボタンをdisabledにするかを判定
    const disabledJudge = () => {
        const numMin: number = Number(minText);
        const numMax: number = Number(maxText);

        if (numMin > numMax) return true;
        if (!keyword.match(/^[a-zA-Z]*$/)) return true;

        return false;
    };

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
            </Box>

        </Box>
    );
};

export default SearchWords;