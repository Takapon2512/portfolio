import React from "react";
import Image from "next/image";

//MUI
import { 
    Box,
    Typography,
    Link
} from '@mui/material';

//Font
import { notoSansJP } from "@/utils/font";

//CSS
import styles from './secondcontent.module.scss';

//Image
import eStudy01 from '../../../../public/e-study_img01.jpg';

const SecondContent = () => {

    return (
        <>
        <Box className={styles.secC}>
            <Box className={styles.secC_container}>
                <Typography 
                variant="h2"
                className={`${notoSansJP.className} ${styles.secC_title}`}
                >
                    苦手な暗記を得意に
                </Typography>
                <Image 
                className={styles.secC_image}
                src={eStudy01}
                width={1280}
                height={905}
                alt='苦手な暗記を得意に'
                />
                <Typography
                variant="h3"
                className={`${notoSansJP.className} ${styles.secC_subtitle}`}
                >
                    シンプルな単語帳
                </Typography>
                <Typography
                className={`${notoSansJP.className} ${styles.secC_subDescription}`}
                >
                    ひと目で英単語と日本語訳を確認できるシンプルなデザイン構成です。
                    <br></br>
                    ボタン1つで次の単語に進めるようになっており、操作が簡単です。
                </Typography>
            </Box>
        </Box>
        </>
    )
};

export default SecondContent;