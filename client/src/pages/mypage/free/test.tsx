import React from 'react';

//MUI
import { 
    Box,
} from '@mui/material';

//CSS
import styles from "./test.module.scss";

//Component
import Layout from '@/components/Layout/layout';
import WordTest from '@/components/freeComponent/WordTest/WordTest';


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