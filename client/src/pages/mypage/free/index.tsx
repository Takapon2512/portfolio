import react, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { DBState } from '@/store/mypageState';

//lib
import apiClient from '@/lib/apiClient';

//MUI
import { 
  Box,
} from '@mui/material';

//CSS
import styles from './index.module.scss';

//type
import { WordDBType } from '@/types/globaltype';

//Component
import Layout from '@/components/Layout/layout';
import SearchWords from '@/components/freeComponent/SearchWords/SearchWords';
import { GetServerSideProps } from 'next';

//type 
type Props = {
  words: WordDBType[]
}

//サーバーサイドで単語を取得する
export const getServerSideProps: GetServerSideProps = async (context) => {
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

const Free = ({ words }: Props) => {

  return (
    <Layout>
      <Box className={styles.free}>
        <Box className={styles.free_container}>
          <SearchWords dbWords={words} />
        </Box>
      </Box>
    </Layout>
  );
};

export default Free;