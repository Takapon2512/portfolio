import React from "react";

//MUI
import { 
    Box,
    Link,
    List,
    ListItem
} from "@mui/material";

//Font
import { notoSansJP } from "@/utils/font";

//CSS
import styles from './Footer.module.scss';

const Footer = () => {
    //現在の年数を取得
    const date = new Date();
    const year = date.getFullYear();

    //リンクテキスト
    const linkTexts: Array<FooterLink> = [
        {
            text: '当アプリについて',
            link: '/app'
        },
        {
            text: '利用規約',
            link: '/terms'
        },
        {
            text: 'プライバシーポリシー',
            link: '/privacy'
        },
        {
            text: 'お問い合わせ',
            link: '/contact'
        },
        {
            text: '運営情報',
            link: 'https://code-deblog.vercel.app/'
        }
    ];

    type FooterLink = {
        text: string,
        link: string
    }

    return (
        <>
        <Box className={styles.footer}>
            <Box className={styles.footer_container}>
                <List className={styles.footer_left}>
                    {
                        linkTexts.map((linkText, index) => (
                            <ListItem key={index} className={styles.footer_list}>
                                <Link
                                href={linkText.link}
                                className={`${notoSansJP.className} ${styles.footer_link}`}
                                >
                                    {linkText.text}
                                </Link>
                            </ListItem>
                        ))
                    }
                </List>
                <Box className={`${styles.footer_right} ${notoSansJP.className}`}>
                    &copy; {year} App
                </Box>
            </Box>
        </Box>
        </>
    );
};

export default Footer;