import React from 'react';

//MUI
import { 
    Box, 
    Typography, 
    Button 
} from "@mui/material";

//CSS
import styles from "./Unsubscribe.module.scss";

//utils
import { notoSansJP } from '@/utils/font';

const Unsubscribe = () => {
    return (
        <Box className={styles.unsubscribe}>
            <Typography className={`${styles.unsubscribe_title} ${notoSansJP.className}`}>
                退会する
            </Typography>
            <Box className={styles.unsubscribe_buttonBox}>
                <Button
                className={`${notoSansJP.className}`}
                >
                    
                </Button>
            </Box>
        </Box>
    );
};

export default Unsubscribe;