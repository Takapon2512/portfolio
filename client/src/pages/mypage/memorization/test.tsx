import React from 'react';
import { GetServerSideProps } from 'next';

//lib
import apiClient from '@/lib/apiClient';

//MUI
import { Box } from '@mui/material';

//CSS
import styles from "./test.module.scss";

//Component
import Layout from '@/components/Layout/layout';
import WordTest from '@/components/memorizeComponents/WordTest/WordTest';

//SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token: string | undefined = context.req.headers.cookie?.split("=")[1];
    const response = await apiClient.get("/users/setting_find", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      props: { 
        timeConstraint: { time_constraint: response.data.time_constraint } 
      }
    }

  } catch (err) {
    console.error(err);
    return {
      notFound: true
    }
  };
};

const Test = ({ timeConstraint }: { timeConstraint: number }) => {
  return (
    <Layout>
        <Box className={styles.memorize}>
            <Box className={styles.memorize_container}>
                <WordTest timeConstraint={timeConstraint} />
            </Box>
        </Box>
    </Layout>
  )
};

export default Test;