import React from 'react';

//MUI
import { Box, Typography } from '@mui/material';

//CSS
import styles from "./Day.module.scss";

//type
import dayjs, { Dayjs } from 'dayjs';

//utils
import { notoSansJP } from '@/utils/font';

const Day = ({day, rowIndex}: {day: Dayjs, rowIndex: number}) => {
    //今日の日付に色をつける
    const getCurrentDayStyle = () => {
        return day.format("YY-MM-DD") === dayjs().format("YY-MM-DD") ? true : false;
    };

    return (
        <Box className={styles.calendar_days}>            
            <Box className={styles.calendar_dayWrapper}>
                { 
                    rowIndex === 0 
                    &&
                    <Typography className={`${styles.calendar_week} ${notoSansJP.className}`}>
                        { day.format("ddd") }
                    </Typography>
                }
                <Typography 
                className={`${styles.calendar_day} ${notoSansJP.className}`}
                sx={
                    getCurrentDayStyle() 
                    ? {
                        backgroundColor: "rgb(240, 119, 49)",
                        borderRadius: "50%",
                        color: "#fff"
                    } : {}
                }
                >
                    { day.format("DD") }
                </Typography>
            </Box>
        </Box>
    );
};

export default Day;