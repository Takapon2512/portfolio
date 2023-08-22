import React, { useState } from 'react';

//recoil
import { useRecoilValue } from 'recoil';
import { dbWordsState } from '@/store/mypageState';

//MUI
import { 
    Box,
    Typography,
    Button,
    TextField
} from '@mui/material';

//CSS
import styles from "./SearchWordsInput.module.scss";
import { notoSansJP } from '@/utils/font';

//Components
import WordList from '../WordList/WordList';

//type
import { UserInputType, WordDataType } from '@/types/globaltype';

const SearchWordsInput = () => {
    const dbWords: Array<WordDataType> = useRecoilValue(dbWordsState);

    const [userInput, setUserInput] = useState<UserInputType>({
        minText: "1",
        maxText: String(dbWords.length),
        wordText: ""
    });
    const prevUserInput: UserInputType = userInput;

    //テキストフィールドの内容を監視
    const changeMinText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUserInput({...prevUserInput, minText: e.target.value});
    const changeMaxText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUserInput({...prevUserInput, maxText: e.target.value});
    const changeWordText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUserInput({...prevUserInput, wordText: e.target.value}); 

    return (
        <Box className={styles.inputs}>
            <Box className={styles.inputs_searchNumber}>
                <TextField 
                label="最初の単語番号"
                type='number'
                className={styles.inputs_searchNumMin}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeMinText(e)}
                value={userInput.minText}
                />
                <Typography className={`${styles.inputs_searchNumberMiddle} ${notoSansJP.className}`}>
                    〜
                </Typography>
                <TextField 
                label="最後の単語番号"
                type='number'
                className={styles.inputs_searchNumMax}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeMaxText(e)}
                value={userInput.maxText}
                />
            </Box>
            <Box className={styles.inputs_keyword}>
                <TextField 
                label="英単語で検索"
                fullWidth
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => changeWordText(e)}
                />
            </Box>
            <WordList
            minText={userInput.minText}
            maxText={userInput.maxText}
            wordText={userInput.wordText}
            />
        </Box>
    );
};

export default SearchWordsInput;
