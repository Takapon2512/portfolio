import React, { useEffect, useState } from 'react';

//MUI
import {
    Box,
    Typography,
    TextField,
    Button
} from "@mui/material";

//CSS
import styles from "./WordEditing.module.scss";

//utils
import { notoSansJP } from '@/utils/font';

//type
import { WordDBType } from '@/types/globaltype';

const WordEditing = ({ wordData }: { wordData: WordDBType | null }) => {
    const [word, setWord] = useState<WordDBType | null>(null);
    const [english, setEnglish] = useState<string>("");
    const [japanese, setJapanese] = useState<string>("");

    //×ボタンを押した時の処理
    const handleClose = () => {
        setEnglish("");
        setJapanese("");
        
        setWord(null);
    };

    //登録するボタンの無効化判定

    useEffect(() => {
        if (wordData !== null) {
            setWord(wordData);
            setEnglish(wordData.english);
            setJapanese(wordData.japanese);
        }
    }, [wordData]);

    return (
        word !== null ? (
        <>
        <Box className={styles.editing_wordDetail}>
            <Box className={styles.editing_wordDetailContainer}>
                <Box 
                sx={{ 
                    display: "flex", 
                    justifyContent: "space-between"
                }}>
                    <Typography 
                    className={notoSansJP.className} 
                    sx={{ fontSize: "18px", fontWeight: 600, marginBottom: 2}}
                    >
                        単語の編集
                    </Typography>
                    <Button 
                    id="closeBox" 
                    className={styles.editing_close}
                    onClick={handleClose}
                    >
                        <span className={styles.editing_span}></span>
                        <span className={styles.editing_span}></span>
                    </Button>
                </Box>
                <Box className={styles.editing_targetBox}>
                    <Typography
                    className={`${notoSansJP.className} ${styles.editing_targetTitle}`}
                    >
                        対象
                    </Typography>
                    <Typography
                    className={`${notoSansJP.className} ${styles.editing_targetWord}`}
                    >
                        { word.english }
                    </Typography>
                </Box>
                <Box className={styles.editing_English}>
                    <Typography className={`${notoSansJP.className} ${styles.editing_EnglishTitle}`}>
                        英単語
                    </Typography>
                    <TextField 
                    fullWidth
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                    />
                </Box>
                <Box className={styles.editing_Japanese}>
                    <Typography className={`${notoSansJP.className} ${styles.editing_JapaneseTitle}`}>
                        日本語訳
                    </Typography>
                    <TextField 
                    fullWidth
                    value={japanese}
                    onChange={(e) => setJapanese(e.target.value)}
                    />
                </Box>
                <Box className={styles.editing_buttons}>
                    <Button
                    className={`${notoSansJP.className} ${styles.editing_register}`}
                    sx={{ width: { xs: "136px", md: "160px" } }}
                    >
                        登録する
                    </Button>
                    <Button
                    className={`${notoSansJP.className} ${styles.editing_delete}`}
                    sx={{ width: { xs: "136px", md: "160px" } }}
                    >
                        単語を削除
                    </Button>
                </Box>
            </Box>
        </Box>
        </>
        ) : (
        <></>
        )
    );
};

export default WordEditing;