import React, { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

//MUI
import { 
    Box,
    Typography,
    Button
} from '@mui/material';

//Font
import { notoSansJP } from "@/utils/font";

//CSS
import styles from './thirdcontent.module.scss';

//Image
import eStudy01 from '../../../../public/e-study_img01.jpg';

//type
type functionType = {
    title: string;
    imageUrl: string;
    description: string
};

const ThirdContent = () => {
    const [next, setNext] = useState<number>(0);

    gsap.registerPlugin(ScrollTrigger);

    //機能
    const functions: Array<functionType> = [
        {
            title: "暗記カード",
            imageUrl: "/images/memorization1.png",
            description: "暗記カードは、出題対象の単語を覚える機能です。操作はシンプルで、覚えたと思ったら「覚えた！」ボタンを、そうでない場合は「もう一度」ボタンで後回しにできます。また、英語と日本語の切り替えは画面をクリックするだけです。"
        },
        {
            title: "フリーモード",
            imageUrl: "/images/free_search3.png",
            description: "フリーモードでは、取り組みたい単語を出題することができます。1つずつ選んだり、「すべて出題」でまとめて選べます。また、苦手別に検索できるため、苦手な単語だけ取り組むという使い方も可能です。"
        },
        {
            title: "確認テスト",
            imageUrl: "/images/test1.png",
            description: "確認テストでは、暗記カードで暗記した内容を出題します。キーボードで解答するため、あやふやな記憶で正解する心配がありません。スマートフォンやタブレットでは解答しやすいように選択式を採用しております。"
        },
        {
            title: "学習する単語を提示",
            imageUrl: "/images/today_learning3.png",
            description: "本アプリは、学習に効率よく取り組みやすいようにその日に学習する単語を提示しています。ユーザーごとの単語の定着度に基づいており、未学習の単語や苦手な単語が優先して表示されています。これにより、毎回何を学習するべきかと考える必要がありません。"
        }
    ];

    const handleNext = () => {
        let current: number = next;
        if (next === functions.length - 1) {
            current -= functions.length;
        };
        current++;
        setNext(current);
    };

    useEffect(() => {
        
        const thirdEl = document.getElementById("thirdContent");

        const imageBoxEl = document.getElementById("func_image");
        const imageBackEl = document.getElementById("func_back");

        const textBoxEl = document.getElementById("func_text");

        const supportEl = document.getElementById("support");
        const functionEl = document.getElementById("function");

        const nextButton = document.getElementById("nextButton");
        
        if (!thirdEl || !imageBoxEl || !imageBackEl || !textBoxEl || !supportEl || !functionEl || !nextButton) return;

        gsap.to([imageBoxEl, imageBackEl], { 
            x: 0, 
            opacity: 1,
            duration: 1,
            scrollTrigger: {
                trigger: imageBoxEl,
                start: 'top center',
                end: "bottom",
            }
        });

        gsap.to(supportEl, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.5,
            scrollTrigger: {
                trigger: imageBoxEl,
                start: 'top center',
                end: "bottom",
            }
        });

        gsap.to(textBoxEl, {
            x: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
                trigger: imageBoxEl,
                start: 'top center',
                end: "bottom",
            }
        });

        gsap.to(functionEl, {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.5,
            scrollTrigger: {
                trigger: imageBoxEl,
                start: 'top center',
                end: "bottom",
            }
        });

        gsap.to(nextButton, {
            opacity: 1,
            duration: 0.3,
            width: "140px",
            delay: 1,
            scrollTrigger: {
                trigger: imageBoxEl,
                start: 'top center',
                end: "bottom",
            }
        });

    }, []);

    return (
        <>
        <Box id="thirdContent" className={styles.thiC}>
            <Box className={styles.thiC_container}>
                <Typography
                variant="h3"
                className={`${notoSansJP.className} ${styles.thiC_title}`}
                >
                    サポート機能で<br />
                    これらの課題を解決します！
                </Typography>
                <Typography
                id="support"
                sx={{ opacity: 1, transform: "translateX(-100vw)" }}
                className={`${notoSansJP.className} ${styles.thiC_support}`}
                >
                    Support
                </Typography>
                <Typography
                id="function"
                sx={{ opacity: 0, transform: "translateX(100vw)" }}
                className={`${notoSansJP.className} ${styles.thiC_function}`}
                >
                    Function
                </Typography>
                        
                <Box className={styles.thiC_contents} sx={{}}>
                    <Box 
                    id="func_image" 
                    className={styles.thiC_ImageContainer}
                    sx={{ opacity: 0, transform: "translateX(-53vw)" }}
                    >
                        <Image width={540} height={434} src={functions[next].imageUrl} alt="暗記カードの機能" className={styles.thiC_Image} />
                    </Box>
                    <Box 
                    id="func_back" 
                    className={styles.thiC_ImageContainerBack} 
                    component={'span'} 
                    sx={{ opacity: 0, transform: "translateX(-53vw)" }}></Box>
                    <Box 
                    id="func_text" 
                    className={styles.thiC_TextBoxRight}
                    sx={{ transform: "translateX(64vw)", opacity: 0 }}
                    >
                        <Box className={styles.thiC_TextContainer}>
                            <Box className={styles.thiC_TextBox}>
                                <Typography className={styles.thiC_textTitle}>
                                    { functions[next].title }
                                </Typography>
                                <Typography className={styles.thiC_description}>
                                    { functions[next].description }
                                </Typography>
                            </Box>
                        </Box>
                        <Button
                        id="nextButton"
                        className={`${styles.thiC_next} ${notoSansJP.className}`}
                        sx={{ opacity: 0 }}
                        onClick={handleNext}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    )
};

export default ThirdContent;