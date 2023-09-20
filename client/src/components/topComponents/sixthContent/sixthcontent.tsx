import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

//MUI
import { 
    Box,
    Typography,
    Link
} from '@mui/material';

//Font
import { notoSansJP } from "@/utils/font";

//CSS
import styles from './sixthcontent.module.scss';

const SixthContent = () => {
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        const sixCBoxEl = document.getElementById("sixCBox");
        const titleEl = document.getElementById("title");
        const descriptionEl = document.getElementById("description");

        if (!sixCBoxEl || !titleEl || !descriptionEl) return;

        gsap.fromTo(titleEl, {
            opacity: 0,
            transform: "translateY(16px)"
        }, {
            opacity: 1,
            transform: "translateY(0)",
            duration: 0.5,
            scrollTrigger: {
                trigger: sixCBoxEl,
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
                trigger: sixCBoxEl,
                start: 'top 70%',
                end: "bottom"
            }
        });

    }, []);

    return (
        <>
        <Box id="sixCBox" className={styles.sixC}>
            <Box className={styles.sixC_container}>
                <Typography
                id="title"
                variant="h3"
                className={`${notoSansJP.className} ${styles.sixC_subtitle}`}
                >
                    すべて<span style={{ fontSize: "56px", color: "rgb(234, 87, 30)" }} >無料</span>で使えます！
                </Typography>
                <Typography
                id="description"
                className={`${notoSansJP.className} ${styles.sixC_subDescription}`}
                >
                    すべての機能が無料で利用できます。
                    <br />
                    現在は無料でお使いできますが、長期的な運営を行うため、将来的に有料化致します。
                    <br />
                    有料化の時期は、当ページにて後日発表致します。
                </Typography>
                <Typography
                className={`${notoSansJP.className} ${styles.sixC_free}`}
                >
                    ¥0
                </Typography>
            </Box>
        </Box>
        </>
    )
};

export default SixthContent;