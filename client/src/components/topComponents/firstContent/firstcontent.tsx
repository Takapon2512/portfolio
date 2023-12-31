import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

//MUI
import { 
    Box,
    Typography
} from '@mui/material';

//Font
import { notoSansJP, nothingYouCouldDo } from "@/utils/font";

//CSS
import styles from './firstContent.module.scss';

const FirstContent = () => {
    const textRef = useRef<HTMLDivElement | null>(null);
    const descriptionRef = useRef<HTMLDivElement | null>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);

        const horizontalBar = document.getElementById("horizontal");
        const verticalBar = document.getElementById("vertical");
        const container = document.getElementById("firC_container");
        const scroll = document.getElementById("scroll");
        const scrollCircle = document.getElementById("scrollCircle");
        const scrollSmallCircle = document.getElementById("scrollSmallCircle");
        const vocabulary = document.getElementById("vocabulary");
        const english = document.getElementById("english");

        if (!horizontalBar || 
            !verticalBar || 
            !container || 
            !scroll || 
            !scrollCircle || 
            !vocabulary || 
            !scrollSmallCircle ||
            !english
        ) return;

        // GSAPアニメーション
        gsap.fromTo(horizontalBar, { x: '-100%', opacity: 0 },{ x: '0%', opacity: 1, duration: 1, ease: 'power2.inOut', delay: 1 });
        gsap.fromTo(verticalBar, { y: '-100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1, ease: 'power2.inOut', delay: 1 });

        gsap.fromTo(container, { opacity: 0 }, { opacity: 1 });

        gsap.fromTo(scrollCircle, { opacity: 0 }, { opacity: 1, delay: 2 })
        gsap.fromTo(english, { left: -1000, opacity: 0 }, { left: 100, opacity: 1, delay: 3 })
        gsap.fromTo(vocabulary, { left: 1500, opacity: 0 }, { left: 455, opacity: 1, delay: 3 })
        gsap.fromTo(scroll, { height: 0 }, { height: 120, delay: 3 });
        gsap.fromTo(scrollSmallCircle, { bottom: 479 }, { bottom: 364, delay: 5, duration: 2, repeat: -1 });

    }, []);

    useEffect(() => {
        if (isMounted && textRef.current) {
            const textElement = textRef.current;

            const text = textElement.innerText;
            textElement.innerText = ''; // 初期表示を空にする
      
            let index = 0;
            const interval = setInterval(() => {
                textElement.innerText += text[index];
                index++;
        
                if (index === text.length) {
                    clearInterval(interval);
                }
            }, 150);
        };
    }, [isMounted]);

    return (
        <>
        <Box className={styles.firC}>
            <Box id="firC_container" className={styles.firC_container}>
                <Typography 
                variant="h4" 
                className={`${notoSansJP.className} ${styles.firC_title}`}
                style={{ opacity: isMounted ? 1 : 0 }}
                ref={textRef}
                >
                    ラクラク管理で英単語を暗記できる
                </Typography>
                <Typography
                className={`${notoSansJP.className} ${styles.firC_description}`}
                ref={descriptionRef}
                >
                    英単語の学習で何を覚えたかしっかり管理できたら...と思うことはありませんか？
                    本アプリは、管理操作なしで学習すべき単語を示すことができます。
                </Typography>
                <Typography
                id="english"
                className={`${styles.firC_english} ${nothingYouCouldDo.className}`}
                >
                    English
                </Typography>
                <Typography 
                id="vocabulary" 
                className={`${styles.firC_vocabulary} ${nothingYouCouldDo.className}`}
                >
                    Vocabulary
                </Typography>
            </Box>
            <Box id="scrollCircle" className={styles.firC_scrollCircle} component={'span'}></Box>
            <Box id="scroll" className={styles.firC_scroll} component={'span'}></Box>
            <Box id="scrollSmallCircle" className={styles.firC_scrollSmallCircle} component={'span'}></Box>
            <Box id="horizontal" className={styles.firC_horizontal}></Box>
            <Box id="vertical" className={styles.firC_vertical}></Box>
        </Box>
        </>
    )
};

export default FirstContent;