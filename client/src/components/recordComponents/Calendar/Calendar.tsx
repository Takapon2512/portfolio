import React from 'react';

//MUI
import { Box, Typography } from '@mui/material';

//CSS
import styles from "./Calendar.module.scss";

//Component
import Month from './Month';

import { notoSansJP } from '@/utils/font';

const Calendar = () => {
    return (

        <Box className={styles.record}>
            <Typography className={`${styles.record_title} ${notoSansJP.className}`}>
                学習日の記録
            </Typography>
            <Month />
        </Box>

    );
};

export default Calendar;