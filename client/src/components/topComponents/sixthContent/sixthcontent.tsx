import react from 'react';

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

    return (
        <>
        <Box className={styles.sixC}>
            <Box className={styles.sixC_container}>
                <Typography
                variant="h3"
                className={`${notoSansJP.className} ${styles.sixC_subtitle}`}
                >
                    無料で使えます
                </Typography>
                <Typography
                className={`${notoSansJP.className} ${styles.sixC_subDescription}`}
                >
                    すべての機能が無料で利用できます。
                    <br></br>
                    ボランティアで、皆さまの役に立ちたいという想いでこのアプリを作成しました。
                </Typography>
            </Box>
        </Box>
        </>
    )
};

export default SixthContent;