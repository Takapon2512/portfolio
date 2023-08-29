import react, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { DBState } from '@/store/mypageState';

//lib
import apiClient from '@/lib/apiClient';

//MUI
import { Box } from '@mui/material';

//CSS
import styles from './index.module.scss';

//type
import { WordDBType } from '@/types/globaltype';

//Component
import Layout from '@/components/Layout/layout';
import WordRegisterInput from '@/components/mypageComponent/WordRegisterInput/WordRegisterInput';
import RegisterList from '@/components/mypageComponent/RegisterList/RegisterList';
import TodayList from '@/components/mypageComponent/TodayList/TodayList';

const Mypage = () => {

    const [dbWords, setDBWords] = useRecoilState<WordDBType[]>(DBState);

    //DBにある単語を取得
    const fetchWords = async () => {
        try {
            const response = await apiClient.get("/posts/db_search");
            setDBWords(response.data);
        } catch (err) {
            console.error(err);
        }
    };
    console.log(dbWords);
    
    useEffect(() => {
        fetchWords();
    }, []);

    return (
        <>
        <Layout>
            <Box className={styles.home}>
                <Box className={styles.home_container}>
                    <WordRegisterInput dbWords={dbWords}/>
                    <RegisterList dbWords={dbWords} />
                    <TodayList dbWords={dbWords} />
                </Box>
            </Box>
        </Layout>
        </>
    );
};

export default Mypage;