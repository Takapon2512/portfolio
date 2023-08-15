import React from 'react';

//MUI
import { Box } from '@mui/material';

//CSS
import styles from "./result.module.scss";

//Component
import Layout from '@/components/Layout/layout';
import TestResult from '@/components/freeComponent/TestResult/TestResult';

const result = () => {
    const jsonCorrectNum: string = localStorage.getItem("correct") || "";
    console.log(jsonCorrectNum);
    
    return (
        <Layout>
            <Box className={styles.free}>
                <Box className={styles.free_container}>
                    <TestResult />
                </Box>
            </Box>
        </Layout>
    );
};

export default result;