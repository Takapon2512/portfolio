import React from 'react';
import { GetServerSideProps } from 'next';

//lib
import apiClient from '@/lib/apiClient';

//MUI
import { Box } from "@mui/material";

//CSS
import styles from "./wordcard.module.scss";

//Components
import Layout from '@/components/Layout/layout';
import WordCard from '@/components/freeComponent/WordCard/WordCard';

//type
import { WordDBType } from '@/types/globaltype';

//SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token: string | undefined = context.req.headers.cookie?.split("=")[1];
    const responseWords = await apiClient.get("/posts/db_search_free", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      props: { 
        freeWords: responseWords.data
      }
    }

  } catch (err) {
    console.error(err);
    return {
      notFound: true
    }
  };
};

const WordCardPage = ({ freeWords }: { freeWords: WordDBType[] }) => {
  return (
    <Layout>
      <Box className={styles.free}>
        <Box sx={{ maxWidth: "900px", margin: "auto" }}>
          <WordCard freeWords={freeWords} />
        </Box>
      </Box>
    </Layout>
  )
}

export default WordCardPage;