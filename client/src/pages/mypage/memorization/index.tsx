import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

//context
import { useAuth } from '@/context/auth';

//MUI
import { 
  Box 
} from '@mui/material';

//CSS
import styles from "./index.module.scss";

//Component
import Layout from '@/components/Layout/layout';
import WordCard from '@/components/memorizeComponents/WordCard/WordCard';

//SSG
// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const response = await apiClient.get("/posts/db_search");

//     return {
//       props: { words: response.data }
//     }
//   } catch (err) {
//     console.error(err);
//     return {
//       notFound: true
//     };
//   };
// };

const Memorize = () => {
  const router = useRouter();

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