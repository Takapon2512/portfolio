import React from 'react';

//MUI
import { Box, Typography, TextField, Button } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';

//CSS
import styles from "./User.module.scss";

//utils
import { notoSansJP } from '@/utils/font';

const User = () => {
    return (
        <Box className={styles.user}>
            <Typography className={styles.user_title}>
                プロフィール
            </Typography>
            <Box className={styles.user_container}>
                <Box className={styles.user_name}>
                    <Typography className={`${notoSansJP.className} ${styles.user_nameTitle}`}>
                        ユーザー名
                    </Typography>
                    <TextField 
                    fullWidth
                    label="ユーザー名を入力" />
                </Box>
                <Box className={styles.user_image}>
                    <Typography className={`${notoSansJP.className} ${styles.user_iconTitle}`}>
                        ユーザーアイコン
                    </Typography>
                    <MuiFileInput 
                    fullWidth
                    label="クリックして画像をインポートしてください" />
                </Box>
                <Box className={styles.user_buttonWrapper}>
                    <Button
                    className={`${notoSansJP.className} ${styles.user_button}`}
                    >
                        設定する
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default User;