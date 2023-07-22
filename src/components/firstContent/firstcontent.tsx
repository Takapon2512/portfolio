import React from "react";

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

    return (
        <>
        <Box className={styles.firC}>
            <Box className={styles.firC_container}>
                <Typography 
                variant="h4" 
                className={`${notoSansJP.className} ${styles.firC_title}`}>
                    <span>
                        ラクラク管理で
                    </span>
                    <span>
                        英単語を暗記できる
                    </span>
                </Typography>
                <Typography
                className={`${notoSansJP.className} ${styles.firC_description}`}
                >
                    英単語の学習で何を覚えたかしっかり管理できたら...と思うことはありませんか？
                    本アプリは、いま学習すべき単語を示すことができます。
                </Typography>
                <Link href="/register" 
                className={`${notoSansJP.className} ${styles.firC_start}`}>
                    今すぐ始める
                </Link>
            </Box>
        </Box>
        </>
    )
};

export default FirstContent;