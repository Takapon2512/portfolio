import React from 'react';
import dynamic from 'next/dynamic';

//MUI
import { 
    Box,
} from '@mui/material';

//CSS
import styles from "./test.module.scss";

//Component
import Layout from '@/components/Layout/layout';
const WordTest = dynamic(() => import("../../../components/freeComponent/WordTest/WordTest"), { ssr: false });

const Test = () => {

  return (
    <Layout>
        <Box className={styles.free}>
            <Box className={styles.free_container}>
                <WordTest />
            </Box>
        </Box>
    </Layout>
  )
};

export default Test;