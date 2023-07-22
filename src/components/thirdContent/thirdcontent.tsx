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
import styles from './thirdcontent.module.scss';

//Image
import eStudy01 from '../../../public/e-study_img01.jpg';

const ThirdContent = () => {

    return (
        <>
        <Box className={styles.thiC}>
            <Box className={styles.thiC_container}>
                <Image 
                className={styles.thiC_image}
                src={eStudy01}
                width={1280}
                height={905}
                alt='苦手な暗記を得意に'
                />
                <Typography
                variant="h3"
                className={`${notoSansJP.className} ${styles.thiC_subtitle}`}
                >
                    確認テストで定着度UP
                </Typography>
                <Typography
                className={`${notoSansJP.className} ${styles.thiC_subDescription}`}
                >
                    暗記カードで覚えた単語をすぐにテストすることで、定着させます。
                    <br></br>
                    満点を取れるまで続くため、覚え漏れの心配はありません。
                </Typography>
            </Box>
        </Box>
        </>
    )
};

export default ThirdContent;