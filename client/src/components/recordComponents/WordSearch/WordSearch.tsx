import React from 'react';

//MUI
import { Box, Typography } from '@mui/material';

//CSS
import styles from "./WordSearch.module.scss";

//Components
import SearchWordsInput from './SearchWordsInput/SearchWordsInput';

//utils
import { notoSansJP } from '@/utils/font';

const WordSearch = () => {
    return (
        <Box className={styles.record}>
            <Typography className={`${styles.record_title} ${notoSansJP.className}`}>
                英単語の記録
            </Typography>
            <SearchWordsInput />
        </Box>
    );
};

export default WordSearch;