import React from 'react';

//lib
import apiClient from '@/lib/apiClient';

//MUI
import { Box } from '@mui/material';

//CSS
import styles from "./result.module.scss";

//type
import { WordDBType } from '@/types/globaltype';
type Props = {
    words: WordDBType[]
}

//Component
import Layout from '@/components/Layout/layout';
import TestResult from '@/components/freeComponent/TestResult/TestResult';
import { GetServerSideProps } from 'next';

//SSG
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const token: string | undefined = context.req.headers.cookie?.split('=')[1];
        const response = await apiClient.get("/posts/db_search", {
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
    }
};

const result = ({ words }: Props) => {
    
    return (
        <Layout>
            <Box className={styles.free}>
                <Box className={styles.free_container}>
                    <TestResult dbWords={words}/>
                </Box>
            </Box>
        </Layout>
    );
};

export default result;