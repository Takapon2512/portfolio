import React from "react";

//MUI
import { 
    Box,
    Typography,
    Link
} from '@mui/material';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import KeyboardIcon from '@mui/icons-material/Keyboard';

//Font
import { notoSansJP } from "@/utils/font";

//CSS
import styles from './fifthcontent.module.scss'

const FifthContent = () => {

    return (
        <>
        <Box className={styles.fifC}>
            <Box className={styles.fifC_container}>
                <Typography
                variant="h6"
                className={styles.fifC_title}
                >
                    他にもこんな機能があります
                </Typography>
                <Box className={styles.fifC_boxs}>
                    <Box className={styles.fifC_function}>
                        <FreeBreakfastIcon 
                        className={styles.fifC_icon}
                        />
                        <Box className={styles.fifC_text}>
                            <Typography
                            className={`${notoSansJP.className} ${styles.fifC_fcTitle}`}
                            >
                                フリーモード搭載
                            </Typography>
                            <Typography
                            className={`${notoSansJP.className} ${styles.fifC_fcDescription}`}
                            >
                                学習したいと思った単語を自由に暗記・テストする機能を搭載しています。
                                <br></br>
                                暗記の補強をしたいときやもの足りないと感じるときにおすすめのモードです。
                            </Typography>
                        </Box>
                    </Box>
                    <Box className={styles.fifC_function}>
                        <AirlineSeatFlatIcon 
                        className={styles.fifC_icon}
                        />
                        <Box className={styles.fifC_text}>
                            <Typography
                            className={`${notoSansJP.className} ${styles.fifC_fcTitle}`}
                            >
                                サボりも反映
                            </Typography>
                            <Typography
                            className={`${notoSansJP.className} ${styles.fifC_fcDescription}`}
                            >
                                学習に取り組み忘れた場合、ステータスをリセットする機能を搭載しています。
                                <br></br>
                                これにより、定着している単語とそうでない単語を正確に反映します。
                            </Typography>
                        </Box>
                    </Box>
                    <Box className={styles.fifC_function}>
                        <SmartphoneIcon 
                        className={styles.fifC_icon}
                        />
                        <Box className={styles.fifC_text}>
                            <Typography
                            className={`${notoSansJP.className} ${styles.fifC_fcTitle}`}
                            >
                                PC・スマホで使える
                            </Typography>
                            <Typography
                            className={`${notoSansJP.className} ${styles.fifC_fcDescription}`}
                            >
                                インストール不要で、PCだけでなくスマホやタブレットからアクセスできます。
                                <br></br>
                                端末に最適化された画面で、アプリをお使いいただけます。
                            </Typography>
                        </Box>
                    </Box>
                    <Box className={styles.fifC_function}>
                        <KeyboardIcon
                        className={styles.fifC_icon}
                        />
                        <Box className={styles.fifC_text}>
                            <Typography
                            className={`${notoSansJP.className} ${styles.fifC_fcTitle}`}
                            >
                                タイピングが苦手でも安心
                            </Typography>
                            <Typography
                            className={`${notoSansJP.className} ${styles.fifC_fcDescription}`}
                            >
                                タイピングが苦手な人も取り組みやすいように解答時間を延ばすことができます。
                                <br></br>
                                あとから変更できるため、慣れてきてから時間を短くできます。
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    )
};

export default FifthContent;