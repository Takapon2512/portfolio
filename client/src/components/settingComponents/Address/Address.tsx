import React, { useState } from 'react';

//lib
import apiClient from '@/lib/apiClient';

//MUI
import { Box, Typography, TextField, Button } from '@mui/material';

//CSS
import styles from "./Address.module.scss";

//utils
import { notoSansJP } from '@/utils/font';

const Address = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassWord, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handleCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value);
    const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value);
    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

    //ユーザー情報をサーバーに送信
    const handleUserInfoSend = async () => {
        if (!disabledJudge()) {
            const userInfo = { name, email, currentPassword, newPassWord, confirmPassword };
            const response = await apiClient.post("/users/user_upload", userInfo);

            alert(response.data.message);
        };
        setName("");
        setEmail("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    //ボタンを押せなくする判定
    const disabledJudge = () => {
        if (currentPassword && newPassWord && confirmPassword) return false;
        if (((currentPassword || newPassWord || confirmPassword) && !(currentPassword && newPassWord && confirmPassword)) || // 3つのパスワードのうち1つ以上に文字が入った場合、全てのパスワードを入力しなければならない
        !(email || name)) return true;

        return false;
    };

    return (
        <Box className={styles.address}>
            <Typography className={styles.address_title}>
                ユーザー情報
            </Typography>
            <Box className={styles.address_container}>
                <Box className={styles.address_name}>
                    <Typography className={`${notoSansJP.className} ${styles.address_nameTitle}`}>
                        新しいユーザー名
                    </Typography>
                    <TextField 
                    fullWidth
                    onChange={handleNameChange}
                    value={name}
                    label="ユーザー名を入力" />
                </Box>
                <Box className={styles.address_mail}>
                    <Typography className={`${notoSansJP.className} ${styles.address_mailTitle}`}>
                        新しいメールアドレス
                    </Typography>
                    <TextField 
                    fullWidth
                    value={email}
                    onChange={handleMailChange}
                    type='email'
                    label="メールアドレスを入力"
                    />
                </Box>
                <Box className={styles.address_password}>
                    <Typography className={`${notoSansJP.className} ${styles.address_passwordTitle}`}>
                        現在のパスワード
                    </Typography>
                    <TextField 
                    fullWidth
                    value={currentPassword}
                    onChange={handleCurrentPassword}
                    type='password'
                    label="現在のパスワードを入力"
                    />
                </Box>
                <Box className={styles.address_password}>
                    <Typography className={`${notoSansJP.className} ${styles.address_passwordTitle}`}>
                        新しいパスワード
                    </Typography>
                    <TextField 
                    fullWidth
                    value={newPassWord}
                    onChange={handleNewPassword}
                    type='password'
                    label="新しいパスワードを入力"
                    />
                </Box>
                <Box className={styles.address_password}>
                    <Typography className={`${notoSansJP.className} ${styles.address_passwordTitle}`}>
                        パスワード確認
                    </Typography>
                    <TextField 
                    fullWidth
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    type='password'
                    label="新しいパスワードを再度入力"
                    />
                </Box>
                <Box className={styles.address_buttonWrapper}>
                    <Button
                    className={`${notoSansJP.className} ${styles.address_button}`}
                    disabled={disabledJudge()}
                    onClick={handleUserInfoSend}
                    >
                        変更する
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Address;