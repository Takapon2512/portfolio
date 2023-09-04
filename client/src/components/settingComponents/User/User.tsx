import React, { useState } from 'react';
import axios from 'axios';

//MUI
import { Box, Typography, TextField, Button } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';

//CSS
import styles from "./User.module.scss";

//utils
import { notoSansJP } from '@/utils/font';
import { apiClient_multi } from '@/lib/apiClient';

const User = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    //画像を選択したときの処理
    const handleImageChange = (file: File | null) => {
        if (file) {
            setSelectedImage(file);
        } else {
            setSelectedImage(null);
        };
    };

    //画像のアップロード処理
    const handleUpload = async () => {
        if (selectedImage) {
            try {
                const formData: FormData = new FormData();
                formData.append("profile_icon", selectedImage);
    
                //サーバーへのアップロード
                const response = await apiClient_multi.post("/users/profile_upload", formData);
    
                //アップロード成功時の処理
                console.log("アップロード成功", response.data);
    
            } catch (err) {
                console.error("アップロードエラー", err);
            }
        };


    };

    return (
        <Box className={styles.user}>
            <Typography className={styles.user_title}>
                アイコン
            </Typography>
            <Box className={styles.user_container}>
                <Box className={styles.user_image}>
                    <Typography className={`${notoSansJP.className} ${styles.user_iconTitle}`}>
                        ユーザーアイコン
                    </Typography>
                    <MuiFileInput 
                    fullWidth
                    value={selectedImage}
                    label="クリックして画像をインポートしてください" 
                    onChange={handleImageChange}
                    />
                </Box>
                <Box className={styles.user_buttonWrapper}>
                    <Button
                    className={`${notoSansJP.className} ${styles.user_button}`}
                    onClick={handleUpload}
                    disabled={selectedImage ? false : true}
                    >
                        設定する
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default User;