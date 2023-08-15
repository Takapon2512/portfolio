import React from 'react';

//recoil
import { useRecoilState } from 'recoil';
import { dbWordsState } from '@/store/mypageState';

//MUI
import{
    Box,
    Typography,
    Button,
    Paper,
    TextField
} from "@mui/material";

//CSS
import styles from "./TestResult.module.scss";

//Types
import { WordDataType } from '@/types/globaltype';

//utils
import { notoSansJP } from '@/utils/font';

const TestResult = () => {
    return (
        <Box className={styles.free_secondContents}>
            結果発表
        </Box>
    );
};

export default TestResult;