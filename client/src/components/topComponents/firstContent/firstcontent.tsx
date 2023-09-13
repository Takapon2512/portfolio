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

        const circlesTl = gsap.timeline({ repeat: -1 });
        const outCircleTl = gsap.timeline({ repeat: -1 });

        const horizontalBar = document.getElementById("horizontal");
        const verticalBar = document.getElementById("vertical");
        const container = document.getElementById("firC_container");
        const scroll = document.getElementById("scroll");
        const scrollCircle = document.getElementById("scrollCircle");
        const scrollSmallCircle = document.getElementById("scrollSmallCircle");
        const vocabulary = document.getElementById("vocabulary");

        if (!horizontalBar || 
            !verticalBar || 
            !container || 
            !scroll || 
            !scrollCircle || 
            !vocabulary || 
            !scrollSmallCircle
        ) return;

        // GSAPアニメーション
        gsap.fromTo(horizontalBar, { x: '100%', opacity: 0 },{ x: '0%', opacity: 1, duration: 1, ease: 'power2.inOut', delay: 1 });
        gsap.fromTo(verticalBar, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1, ease: 'power2.inOut', delay: 1 });

        gsap.fromTo(container, { opacity: 0 }, { opacity: 1 });

        gsap.fromTo(scrollCircle, { opacity: 0 }, { opacity: 1, delay: 2 })
        gsap.fromTo(vocabulary, { left: -500 }, { left: -160, delay: 3 })
        gsap.fromTo(scroll, { height: 0 }, { height: 120, delay: 3 });
        gsap.fromTo(scrollSmallCircle, { bottom: 136 }, { bottom: 27, delay: 5, duration: 2 });

        circlesTl
        .fromTo("#circle0", { y: 15 }, { y: -20, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start')
        // .fromTo("#circle1", { y: 0 }, { y: -18, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.3')
        // .fromTo("#circle2", { y: -20 }, { y: 10, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.1')
        // .fromTo("#circle3", { y: 10 }, { y: -20, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.4')
        // .fromTo("#circle4", { y: -5 }, { y: 13, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1}, 'start+=0.6');

        outCircleTl
        .fromTo("#outCircle0_1", { y: 15 }, { y: -20, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start')
        .fromTo("#outCircle0_2", { y: 15 }, { y: -20, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start')
        .fromTo("#smallCircle0_1", { y: 15 }, { y: -20, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start')
        .fromTo("#smallCircle0_2", { y: 15 }, { y: -20, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start')
        // .fromTo("#outCircle1", { y: 0 }, { y: -18, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.3')
        // .fromTo("#smallCircle1", { y: 0 }, { y: -18, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.3')
        // .fromTo("#outCircle2", { y: -20 }, { y: 10, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.1')
        // .fromTo("#smallCircle2", { y: -20 }, { y: 10, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.1')
        // .fromTo("#outCircle3", { y: 10 }, { y: -20, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.4')
        // .fromTo("#smallCircle3", { y: 10 }, { y: -20, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.4')
        // .fromTo("#outCircle4", { y: -5 }, { y: 13, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1}, 'start+=0.6')
        // .fromTo("#smallCircle4", { y: -5 }, { y: 13, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1}, 'start+=0.6')

        //アニメーション開始
        circlesTl.play();
        outCircleTl.play();
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
                {/* <Box id="circle0" className={styles.firC_circle0}></Box> */}
                {/* <Box id="circle1" className={styles.firC_circle1}></Box>
                <Box id="circle2" className={styles.firC_circle2}></Box>
                <Box id="circle3" className={styles.firC_circle3}></Box>
                <Box id="circle4" className={styles.firC_circle4}></Box> */}
{/* 
                <svg 
                id="outCircle0_1"
                xmlns="http://www.w3.org/2000/svg" 
                width="600" 
                height="200" 
                viewBox="0 0 440 200" 
                className={styles.firC_sideCircle0}
                >
                    <ellipse cx="220" cy="100" rx="240" ry="30" fill="none" stroke="#e6e6e6" strokeWidth="3" />
                </svg>
                <Box id="smallCircle0_1" className={styles.firC_smallCircle0_1}></Box>

                <svg
                id="outCircle0_2" 
                xmlns="http://www.w3.org/2000/svg" 
                width="600" 
                height="200" 
                viewBox="0 0 440 200" 
                className={styles.firC_sideCircle0_2}
                >
                    <ellipse cx="220" cy="100" rx="240" ry="30" fill="none" stroke="#e6e6e6" strokeWidth="3" />
                </svg>
                <Box id="smallCircle0_2" className={styles.firC_smallCircle0_2}></Box> */}

                {/* <svg 
                id="outCircle1"
                xmlns="http://www.w3.org/2000/svg" 
                width="600" 
                height="200" 
                viewBox="0 0 440 200" 
                className={styles.firC_sideCircle1}
                >
                    <ellipse cx="220" cy="100" rx="265" ry="30" fill="none" stroke="#e6e6e6" strokeWidth="3" />
                </svg>
                <Box id="smallCircle1" className={styles.firC_smallCircle1}></Box>

                <svg 
                id="outCircle2"
                xmlns="http://www.w3.org/2000/svg" 
                width="600" 
                height="200" 
                viewBox="0 0 440 200" 
                className={styles.firC_sideCircle2}
                >
                    <ellipse cx="220" cy="100" rx="280" ry="30" fill="none" stroke="#e6e6e6" strokeWidth="3" />
                </svg>
                <Box id="smallCircle2" className={styles.firC_smallCircle2}></Box>

                <svg 
                id="outCircle3"
                xmlns="http://www.w3.org/2000/svg" 
                width="400" 
                height="200" 
                viewBox="0 0 440 200" 
                className={styles.firC_sideCircle3}
                >
                    <ellipse cx="220" cy="100" rx="160" ry="20" fill="none" stroke="#e6e6e6" strokeWidth="3" />
                </svg>
                <Box id="smallCircle3" className={styles.firC_smallCircle3}></Box>

                <svg 
                id="outCircle4"
                xmlns="http://www.w3.org/2000/svg" 
                width="400" 
                height="200" 
                viewBox="0 0 440 200" 
                className={styles.firC_sideCircle4}
                >
                    <ellipse cx="220" cy="100" rx="160" ry="20" fill="none" stroke="#e6e6e6" strokeWidth="3" />
                </svg>
                <Box id="smallCircle4" className={styles.firC_smallCircle4}></Box> */}
            </Box>
            <Typography 
            id="vocabulary" 
            className={`${styles.firC_vocabulary} ${nothingYouCouldDo.className}`}
            >
                Vocabulary
            </Typography>
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