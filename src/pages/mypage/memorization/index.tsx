import React from 'react';

//MUI
import { 
  Box 
} from '@mui/material';

//CSS
import styles from "./index.module.scss";

//Component
import Layout from '@/components/Layout/layout';
import WordCard from '@/components/memorizeComponents/WordCard/WordCard';

const Memorize = () => {
  return (
    <Layout>
      <Box className={styles.memorize}>
        <Box className={styles.memorizeContainer}>
          <WordCard />
        </Box>
      </Box>
    </Layout>
  )
};

export default Memorize;