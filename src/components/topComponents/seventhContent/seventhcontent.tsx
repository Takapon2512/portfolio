import react, { useState } from 'react';
import Image from 'next/image';

//MUI
import { 
    Box,
    Typography,
    Link,
    Button
} from '@mui/material';

//Font
import { notoSansJP } from "@/utils/font";

//CSS
import styles from './seventhcontent.module.scss';

//Image
import googleBtn from '../../../../public/google_btn.png';
import googleBtn_focus from '../../../../public/google_btn_focus.png';

const SeventhContent = () => {
    //Googleボタンの画像切り替え
    const [googleFocus, setGoogleFocus] = useState(false);

    if (typeof document !== 'undefined') {
        const googleBtnEl = document.getElementById('googleBtn');

        if (googleBtnEl !== null) {
            googleBtnEl.addEventListener('mouseover', () => {
                setGoogleFocus(true)
            });
        };

        if (googleBtnEl !== null) {
            googleBtnEl.addEventListener('mouseleave', () => {
                setGoogleFocus(false)
            });
        };
    };
    
    return (
        <>
        <Box className={styles.sevC}>
            <Box className={styles.sevC_container}>
            <Typography
            variant="h3"
            className={`${notoSansJP.className} ${styles.sevC_subtitle}`}
            >
                今すぐはじめよう
            </Typography>
            <Typography
            className={`${notoSansJP.className} ${styles.sevC_subDescription}`}
            >
                メールアドレス、ユーザー名、パスワードで登録できます。
                <br></br>
                もし、Googleアカウントをお持ちの方は
                <br></br>
                そちらで認証をとることも可能です。
            </Typography>
            <Box className={styles.sevC_buttons}>
                <Link 
                href="/register"
                className={`${notoSansJP.className} ${styles.sevC_mail}`}
                >
                    メールアドレスで登録
                </Link>
                <Button
                className={`${notoSansJP.className} ${styles.sevC_google}`}
                >
                    <Image
                    width={191}
                    height={46}
                    src={
                        googleFocus ? googleBtn_focus : googleBtn
                    }
                    alt='Googleボタン'
                    id='googleBtn'
                    />
                </Button>
            </Box>
            </Box>
        </Box>
        </>
    );
};

export default SeventhContent;