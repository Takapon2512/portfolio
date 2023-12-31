import React from 'react';
import { GetServerSideProps } from 'next';

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
import { CalendarType } from '@/types/globaltype';
type Props = {
  words: WordDBType[],
  calendars: CalendarType[]
}

//Component
import Layout from '@/components/Layout/layout';
import Calendar from '@/components/recordComponents/Calendar/Calendar';
import WordSearch from '@/components/recordComponents/WordSearch/WordSearch';

//SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const token: string | undefined = context.req.headers.cookie?.split('=')[1];
    const response = await apiClient.get("/posts/db_search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseCalendars = await apiClient.get("/users/get_learning_record", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      props: { words: response.data, calendars: responseCalendars.data }
    }
  } catch (err) {
    console.error(err);
    return {
      notFound: true
    };
  };
};

const Record = ({ words, calendars }: Props) => {

  return (
    <Layout>
        <Box className={styles.record}>
          <Box className={styles.record_container}>
            <WordSearch recordWords={words} />
            <Calendar calendars={calendars} />
          </Box>
        </Box>
    </Layout>
  )
};

export default Record;