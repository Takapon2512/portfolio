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
import eStudy01 from '../../../../public/e-study_img01.jpg';

const ThirdContent = () => {
    //機能のタイトル
    const functions = [];

    //紹介画像のURL

    //機能の詳細

    return (
        <>
        <Box className={styles.thiC}>
            <Box className={styles.thiC_container}>
                <Typography
                variant="h3"
                className={`${notoSansJP.className} ${styles.thiC_title}`}
                >
                    サポート機能で<br />
                    これらの課題を解決します！
                </Typography>
                <Box className={styles.thiC_ImageContainer}>
                    <Image width={540} height={434} src="/images/memorization1.png" alt="暗記機能" className={styles.thiC_Image} />
                </Box>
                <Box className={styles.thiC_ImageContainerBack}></Box>
                <Box className={styles.thiC_TextBoxRight}>
                    <Box className={styles.thiC_TextContainer}>
                        <Box className={styles.thiC_TextBox}>
                            <Typography className={styles.thiC_textTitle}>
                                暗記カードの機能
                            </Typography>
                            <Typography className={styles.thiC_description}>
                                暗記カードでは、出題対象の単語を覚えるまで
                                <br />
                                何度でも後回しできます。
                                <br />
                                操作は簡単で、覚えたと思ったら「覚えた！」ボタンを、
                                そうでない場合は「もう一度」ボタンで後で覚え直すことができます。
                                <br />
                                また、アプリに登録された日本語訳は、カードをクリックすると表示されます。
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    )
};

export default ThirdContent;