import React from 'react';
import { GetServerSideProps } from 'next';

//lib
import apiClient from '@/lib/apiClient';

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
import { WordDBType } from '@/types/globaltype';

//SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token: string | undefined = context.req.headers.cookie?.split("=")[1];
    const response = await apiClient.get("/users/find_setting", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const responseWords = await apiClient.get("/posts/db_search_free", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    return {
      props: { 
        timeConstraint: response.data.time_constraint,
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

const Test = ({ timeConstraint, freeWords }: { timeConstraint: number, freeWords: WordDBType[] }) => {

  return (
    <Layout>
        <Box className={styles.free}>
            <Box sx={{ maxWidth: "900px", margin: "auto" }}>
                <WordTest timeConstraint={timeConstraint} freeWords={freeWords} />
            </Box>
        </Box>
    </Layout>
  )
};

export default Test;