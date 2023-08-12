import React from 'react';

//MUI
import { Box } from "@mui/material";

//CSS
import styles from "./wordcard.module.scss";

//Components
import Layout from '@/components/Layout/layout';
import WordCard from '@/components/freeComponent/WordCard/WordCard';

const WordCardPage = () => {

  return (
    <Layout>
      <Box className={styles.free}>
        <Box className={styles.free_container}>
          <WordCard />
        </Box>
      </Box>
    </Layout>
  )
}

export default WordCardPage;