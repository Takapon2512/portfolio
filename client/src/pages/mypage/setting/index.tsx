import React from 'react';

//MUI
import { 
  Box,
} from '@mui/material';

//CSS
import styles from './index.module.scss';

//Component
import Layout from '@/components/Layout/layout';
import User from '@/components/settingComponents/User/User';
import Question from '@/components/settingComponents/Question/Question';
import Address from '@/components/settingComponents/Address/Address';

const Setting = () => {
  return (
    <Layout>
      <Box className={styles.setting}>
        <Box className={styles.setting_container}>
          <User />
          <Address />
          <Question />
        </Box>
      </Box>
    </Layout>
  )
}

export default Setting;