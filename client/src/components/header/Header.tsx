import React from "react";

//MUI
import { 
    Box,
    Link
} from "@mui/material";

//Font
import { notoSansJP } from "@/utils/font";

//CSS
import styles from './Header.module.scss'

const Header = () => {
    return (
        <>
        <header className={`${notoSansJP.className} ${styles.header}`}>
            <Box className={styles.header_container}>
                <Box className={styles.header_logo}>
                    アプリのロゴ
                </Box>
                <Box className={styles.header_buttons}>
                    <Link href='/login' className={styles.header_login}>ログイン</Link>
                    <Link href='/register' className={styles.header_register}>登録</Link>
                </Box>
            </Box>
        </header>
        </>
    )
}

export default Header;