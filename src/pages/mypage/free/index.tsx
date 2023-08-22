import React from 'react';

//MUI
import { 
  Box,
} from '@mui/material';

//CSS
import styles from './index.module.scss';

//Component
import Layout from '@/components/Layout/layout';
import SearchWords from '@/components/freeComponent/SearchWords/SearchWords';

const Free = () => {
  return (
    <Layout>
      <Box className={styles.free}>
        <Box className={styles.free_container}>
          <SearchWords />
        </Box>
      </Box>
    </Layout>
  );
};

export default Free;