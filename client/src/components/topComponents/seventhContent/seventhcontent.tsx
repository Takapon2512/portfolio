import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

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
    gsap.registerPlugin(ScrollTrigger)
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
    
    useEffect(() => {
        //要素取得
        const sevCBoxEl = document.getElementById("sevC_Box");
        const titleEl = document.getElementById("sevC_title");
        const descriptionEl = document.getElementById("sevC_description");
        const buttonsEl = document.getElementById("sevC_buttons");

        if (!sevCBoxEl || !titleEl || !descriptionEl || !buttonsEl) return;

        gsap.fromTo(titleEl, {
            opacity: 0,
            transform: "translateY(16px)"
        }, {
            opacity: 1,
            transform: "translateY(0)",
            duration: 0.5,
            scrollTrigger: {
                trigger: sevCBoxEl,
                start: 'top 70%',
                end: "bottom"
            }
        });

        gsap.fromTo(descriptionEl, {
            opacity: 0,
            transform: "translateY(16px)"
        }, {
            opacity: 1,
            transform: "translateY(0)",
            duration: 0.5,
            delay: 0.4,
            scrollTrigger: {
                trigger: sevCBoxEl,
                start: 'top 70%',
                end: "bottom"
            }
        });

        gsap.fromTo(buttonsEl, {
            opacity: 0,
            transform: "translateY(16px)"
        }, {
            opacity: 1,
            transform: "translateY(0)",
            duration: 0.5,
            delay: 0.4,
            scrollTrigger: {
                trigger: sevCBoxEl,
                start: 'top 70%',
                end: "bottom"
            }
        });
    }, []);
    
    return (
        <>
        <Box id="sevC_Box" className={styles.sevC}>
            <Box className={styles.sevC_container}>
            <Typography
            id="sevC_title"
            variant="h3"
            className={`${notoSansJP.className} ${styles.sevC_subtitle}`}
            >
                今すぐ学習しよう！
            </Typography>
            <Typography
            id="sevC_description"
            className={`${notoSansJP.className} ${styles.sevC_subDescription}`}
            >
                メールアドレス、ユーザー名、パスワードで登録できます。
                <br></br>
                もし、Googleアカウントをお持ちの方は
                <br></br>
                そちらで認証をとることも可能です。
            </Typography>
            <Box id="sevC_buttons" className={styles.sevC_buttons}>
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