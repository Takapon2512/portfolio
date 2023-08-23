import React from 'react';

//MUI
import { Box, Typography, TextField, Button } from '@mui/material';

//CSS
import styles from "./Address.module.scss";

//utils
import { notoSansJP } from '@/utils/font';

const Address = () => {
    return (
        <Box className={styles.address}>
            <Typography className={styles.address_title}>
                ユーザー情報
            </Typography>
            <Box className={styles.address_container}>
                <Box className={styles.address_mail}>
                    <Typography className={`${notoSansJP.className} ${styles.address_mailTitle}`}>
                        新しいメールアドレス
                    </Typography>
                    <TextField 
                    fullWidth
                    type='email'
                    label="メールアドレスを入力してください"
                    />
                </Box>
                <Box className={styles.address_password}>
                    <Typography className={`${notoSansJP.className} ${styles.address_passwordTitle}`}>
                        現在のパスワード
                    </Typography>
                    <TextField 
                    fullWidth
                    type='password'
                    label="現在のパスワードを入力してください"
                    />
                </Box>
                <Box className={styles.address_password}>
                    <Typography className={`${notoSansJP.className} ${styles.address_passwordTitle}`}>
                        新しいパスワード
                    </Typography>
                    <TextField 
                    fullWidth
                    type='password'
                    label="新しいパスワードを入力してください"
                    />
                </Box>
                <Box className={styles.address_password}>
                    <Typography className={`${notoSansJP.className} ${styles.address_passwordTitle}`}>
                        パスワード確認
                    </Typography>
                    <TextField 
                    fullWidth
                    type='password'
                    label="もう1度新しいパスワードを入力してください"
                    />
                </Box>
                <Box className={styles.address_buttonWrapper}>
                    <Button
                    className={`${notoSansJP.className} ${styles.address_button}`}
                    >
                        設定する
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Address;