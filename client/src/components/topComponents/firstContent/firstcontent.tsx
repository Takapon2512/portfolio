import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

//MUI
import { 
    Box,
    Typography,
    Link
} from '@mui/material';

//Font
import { notoSansJP } from "@/utils/font";

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

        circlesTl.fromTo("#circle0", { y: 15 }, { y: -20, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start')
        .fromTo("#circle1", { y: 0 }, { y: -18, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.3')
        .fromTo("#circle2", { y: -20 }, { y: 10, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.1')
        .fromTo("#circle3", { y: 10 }, { y: -20, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 'start+=0.4')
        .fromTo("#circle4", { y: -5 }, { y: 13, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1}, 'start+=0.6');

        outCircleTl.fromTo("#outCircle4", { y: -5 }, { y: 13, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: 1}, 'start+=0.6')

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
            <Box className={styles.firC_container}>
                {/* <Box className={styles.firC_vocabularyBox}>
                    <Box className={styles.firC_vocabulary}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="150" viewBox="0 0 300 200">
                        <rect width="100%" height="100%" fill="#f0f0f0" rx="10" ry="10" />
                        <text x="50%" y="40%" fontSize="24" textAnchor="middle" fill="#333" className={notoSansJP.className}>
                            My Vocabulary Book
                        </text>
                        <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="4" dy="4" stdDeviation="2" floodColor="#000" floodOpacity="0.5" />
                        </filter>
                        <path d="M50 80 Q80 10 110 80 T170 80" stroke="#0077ff" strokeWidth="2" fill="transparent" />
                        <circle cx="110" cy="80" r="4" fill="#0077ff" />
                        </svg>
                    </Box>
                    <Box className={styles.firC_vocabulary_shadow}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="150" viewBox="0 0 300 200">
                        <rect width="100%" height="100%" fill="#404040" rx="10" ry="10" />
                        </svg>
                    </Box>
                </Box> */}
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
                <Box id="circle0" className={styles.firC_circle0}></Box>
                <Box id="circle1" className={styles.firC_circle1}></Box>
                <Box id="circle2" className={styles.firC_circle2}></Box>
                <Box id="circle3" className={styles.firC_circle3}></Box>
                <Box id="circle4" className={styles.firC_circle4}></Box>
                <svg 
                id="outCircle4"
                xmlns="http://www.w3.org/2000/svg" 
                width="400" 
                height="200" 
                viewBox="0 0 440 200" 
                className={styles.firC_sideCircle4}
                >
                    <ellipse cx="220" cy="100" rx="160" ry="20" fill="none" stroke="#e6e6e6" strokeWidth="10" />
                </svg>
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="600" 
                height="200" 
                viewBox="0 0 440 200" 
                className={styles.firC_sideCircle0}
                >
                    <ellipse cx="220" cy="100" rx="240" ry="30" fill="none" stroke="#e6e6e6" strokeWidth="10" />
                </svg>
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="600" 
                height="200" 
                viewBox="0 0 440 200" 
                className={styles.firC_sideCircle0_2}
                >
                    <ellipse cx="220" cy="100" rx="240" ry="30" fill="none" stroke="#e6e6e6" strokeWidth="10" />
                </svg>
            </Box>
        </Box>
        </>
    )
};

export default FirstContent;