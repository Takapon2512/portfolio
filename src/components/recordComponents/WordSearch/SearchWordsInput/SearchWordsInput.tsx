import React from 'react';

//MUI
import { 
    Box, 
    Paper, 
    Typography,
    Button,
    TextField
} from '@mui/material';

//CSS
import styles from "./SearchWordsInput.module.scss";


const SearchWordsInput = () => {
    return (
        <Paper className={styles.inputs}>
            <Box className={styles.inputs_SearchNumber}>
                <TextField 
                label="最初の単語番号"
                type='number'
                />
                <Typography>
                    〜
                </Typography>
                <TextField 
                label="最後の単語番号"
                type='number'
                />
            </Box>
        </Paper>
    );
};

export default SearchWordsInput;
