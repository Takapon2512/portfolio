import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

//context
import { useAuth } from '@/context/auth';

//lib
import apiClient from '@/lib/apiClient';

//MUI
import { 
  Box 
} from '@mui/material';

//CSS
import styles from "./index.module.scss";

//Component
import Layout from '@/components/Layout/layout';
import WordCard from '@/components/memorizeComponents/WordCard/WordCard';
import { GetServerSideProps } from 'next';

//type
import { WordDBType } from '@/types/globaltype';
type Props = {
  words: WordDBType[]
}

//SSG
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token: string | undefined = context.req.headers.cookie?.split('=')[1];
    const response = await apiClient.get("/posts/db_search_memorize", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

const Memorize = ({ words }: Props) => {
  const router = useRouter();

  return (
    <Layout>
      <Box className={styles.memorize}>
        <Box className={styles.memorizeContainer}>
          <WordCard todayWords={words} />
        </Box>
      </Box>
    </Layout>
  )
};

export default Memorize;