import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

//context
import { useAuth } from '@/context/auth';

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
type Props = {
  words: WordDBType[]
}

//Component
import Layout from '@/components/Layout/layout';
import SearchWords from '@/components/freeComponent/SearchWords/SearchWords';

//SSG
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

const Free = ({ words }: Props) => {
  const { user } = useAuth();

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