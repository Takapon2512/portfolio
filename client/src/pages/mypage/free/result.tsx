import React from 'react';
import dynamic from 'next/dynamic';

//MUI
import { Box } from '@mui/material';

//CSS
import styles from "./result.module.scss";

//Component
import Layout from '@/components/Layout/layout';
const TestResult = dynamic(
    () => import("../../../components/freeComponent/TestResult/TestResult"),
    { ssr: false }
);

const result = () => {
    
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