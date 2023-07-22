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
import styles from './forthcontent.module.scss';

//Image
import eStudy01 from '../../../public/e-study_img01.jpg';

const ForthContent = () => {

    return (
        <>
        <Box className={styles.forC}>
            <Box className={styles.forC_container}>
                <Image 
                className={styles.forC_image}
                src={eStudy01}
                width={1280}
                height={905}
                alt='苦手な暗記を得意に'
                />
                <Typography
                variant="h3"
                className={`${notoSansJP.className} ${styles.forC_subtitle}`}
                >
                    今日やるべき単語をやるだけ
                </Typography>
                <Typography
                className={`${notoSansJP.className} ${styles.forC_subDescription}`}
                >
                    単語ごとに取り組んだ日と定着度が紐づいているため、
                    <br></br>
                    忘れそうな日に再度学習に取り組めるようになっております。
                </Typography>
            </Box>
        </Box>
        </>
    )
};

export default ForthContent;