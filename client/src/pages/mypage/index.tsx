import react from 'react';
import { GetStaticProps } from 'next';

//lib
import apiClient from '@/lib/apiClient';

//MUI
import { Box } from '@mui/material';

//CSS
import styles from './index.module.scss';

//type
import { WordDBType } from '@/types/globaltype';
type Props = {
  words: WordDBType[]
};

//Component
import Layout from '@/components/Layout/layout';
import WordRegisterInput from '@/components/mypageComponent/WordRegisterInput/WordRegisterInput';
import RegisterList from '@/components/mypageComponent/RegisterList/RegisterList';
import TodayList from '@/components/mypageComponent/TodayList/TodayList';

//SSGでDBの単語を取得
export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await apiClient.get("/posts/db_search");

    return {
      props: { words: response.data }
    }
  } catch (err) {
    console.error(err);
    return {
      notFound: true
    };
  };
};

const Mypage = ({ words }: Props) => {

    return (
        <>
        <Layout>
            <Box className={styles.home}>
                <Box className={styles.home_container}>
                    <WordRegisterInput dbWords={words}/>
                    <RegisterList dbWords={words} />
                    <TodayList dbWords={words} />
                </Box>
            </Box>
        </Layout>
        </>
    );
};

export default Mypage;