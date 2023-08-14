import React, { useEffect } from 'react';
import { useRouter, NextRouter } from 'next/router';

//recoil
import { useRecoilState } from 'recoil';
import { sidebarState } from '@/store/layoutState';

//MUI
import { 
    Box,
} from '@mui/material';

//CSS
import styles from "./test.module.scss";

//Component
import Layout from '@/components/Layout/layout';
import WordTest from '@/components/freeComponent/WordTest/WordTest';

//type
import { SidebarType } from '@/types/globaltype';

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