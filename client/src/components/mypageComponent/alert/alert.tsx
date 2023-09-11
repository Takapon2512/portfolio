import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

//recoil
import { useRecoilValue } from 'recoil';
import { alertState } from '@/store/mypageState';

//MUI
import { 
    Box,
    Alert
} from '@mui/material';

//CSS
import styles from "./alert.module.scss";

const AlertComponent = () => {
    const alertFlag = useRecoilValue<string>(alertState);

    useEffect(() => {
        //アラートボックスのアニメーション
        const alertAnimation = gsap.timeline();

        alertAnimation.to("#alertBox", 0.5, {
            opacity: 1
        }, 0)
        .to('#alertBox', 1, {
            opacity: 0
        }, 4);
    }, []);

    return (
        <Box 
        className={styles.alert}
        id="alertBox"
        sx={{ opacity: 0 }}
        >
            {
                alertFlag === "失敗" ? (
                    <Alert variant='filled' severity='error' id='alert' className={styles.alert_error}>
                        登録に失敗しました。
                    </Alert>
                ) : (
                    <Alert variant='filled' severity='success' id='alert' className={styles.alert_success}>
                        登録に成功しました！
                    </Alert>
                )
            }
        </Box>
    );
};

export default AlertComponent;