import react, { useState } from 'react';

//MUI
import { Box } from '@mui/material';

//CSS
import styles from './index.module.scss';

//Component
import Layout from '@/components/Layout/layout';
import WordRegisterInput from '@/components/mypageComponent/WordRegisterInput/WordRegisterInput';
import RegisterList from '@/components/mypageComponent/RegisterList/RegisterList';
import TodayList from '@/components/mypageComponent/TodayList/TodayList';

const Mypage = () => {

    return (
        <>
        <Layout>
            <Box className={styles.home}>
                <Box className={styles.home_container}>
                    <WordRegisterInput />
                    <RegisterList />
                    <TodayList />
                </Box>
            </Box>
        </Layout>
        </>
    )
};

export default Mypage;