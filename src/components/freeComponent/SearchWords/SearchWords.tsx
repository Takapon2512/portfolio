import React from 'react';

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

const SearchWords = () => {
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
                    />
                    <Typography className={styles.free_searchNumberMiddle}>
                        ～
                    </Typography>
                    <TextField 
                    label="最後の単語番号"
                    type='number'
                    className={styles.free_searchNumMax}
                    />
                </Box>
                <Box className={styles.free_searchKeyword}>
                    <TextField 
                    label="キーワードで検索"
                    fullWidth
                    />
                </Box>
                <Button>
                    検索
                </Button>
                <Button>
                    削除
                </Button>
            </Box>
        </Box>
    );
};

export default SearchWords;