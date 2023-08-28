import React from 'react';

//MUI
import { 
  Box,
} from '@mui/material';

//CSS
import styles from './index.module.scss';

//Component
import Layout from '@/components/Layout/layout';
import Calendar from '@/components/recordComponents/Calendar/Calendar';
import WordSearch from '@/components/recordComponents/WordSearch/WordSearch';

const Record = () => {
  return (
    <Layout>
        <Box className={styles.record}>
          <Box className={styles.record_container}>
            <Calendar />
            <WordSearch />
          </Box>
        </Box>
    </Layout>
  )
};

export default Record;