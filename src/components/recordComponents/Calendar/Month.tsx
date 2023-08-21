import React, { useState } from 'react';
import Day from './Day';

//MUI
import { Box, Typography, Button } from '@mui/material';

//MUIIcon
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

//CSS
import styles from "./Month.module.scss";

//type
import dayjs, { Dayjs } from 'dayjs';

//utils
import { getMonth } from '@/utils/days';
import { notoSansJP } from '@/utils/font';

const Month = () => {
    const [monthNum, setMonthNum] = useState<number>(dayjs().month());

    return (
        <Box className={styles.calendar_paper}>
            <Box className={styles.calendar_monthDisplay}>
                <Typography className={`${notoSansJP.className}`} sx={{fontSize: "20px"}}>
                    { dayjs(new Date(dayjs().year(), monthNum)).format("MMMM YYYY") }
                </Typography>
                <Box className={styles.calendar_buttons}>
                    <Button className={styles.calendar_before} onClick={() => setMonthNum(prev => prev - 1)}>
                        <NavigateBeforeIcon />
                    </Button>
                    <Button className={styles.calendar_next} onClick={() => setMonthNum(prev => prev + 1)}>
                        <NavigateNextIcon />
                    </Button>
                </Box>
            </Box>
            <Box className={styles.calendar_container}>
                {
                    getMonth(monthNum).map((row: Dayjs[], i) => (
                        <React.Fragment key={i}>
                            {
                                row.map((day: Dayjs, index: number) => (
                                    <Day day={day} key={index} rowIndex={i} />
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </Box>
        </Box>
    );
};

export default Month;