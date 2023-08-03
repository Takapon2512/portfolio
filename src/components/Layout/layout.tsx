import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

//MUI
import {
    Box,
    Typography,
    List,
    ListItem
} from '@mui/material';

//Font
import { notoSansJP } from '../../utils/font';

//CSS
import styles from './layout.module.scss';

//Icon
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import AlbumIcon from '@mui/icons-material/Album';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

//Image
import noImage from '../../../public/images/noImage.png';

const Layout = ({ children }: { children: React.ReactNode }) => {
    //useRouter
    const router = useRouter();

    const sidebarData = [
        {
            title: "ホーム",
            icon: <HomeIcon />,
            link: "/mypage"
        },
        {
            title: "暗記モード",
            icon: <ViewListIcon />,
            link: "/mypage/memorization"
        },
        {
            title: "フリーモード",
            icon: <FreeBreakfastIcon />,
            link: "/mypage/free"
        },
        {
            title: "記録",
            icon: <AlbumIcon />,
            link: "/mypage/record"
        },
        {
            title: "設定",
            icon: <SettingsIcon />,
            link: "/mypage/setting"
        },
        {
            title: 'ログアウト',
            icon: <LogoutIcon />,
            link: '../login'
        }
    ];
    const activeJudge = (link: string) => {
        if (router.pathname === link) {
            return "active";
        } else {
            return "passive";
        };
    };

    const handleClickMode = (link: string) => window.location.pathname = link;
    return (
        <Box className={styles.layout}>
            <Box className={styles.layout_container}>
                    <Box className={styles.layout_sidebar}>
                        <Box className={styles.layout_imageWrapper}>
                            <Image 
                            className={styles.layout_image}
                            src={noImage}
                            width={104}
                            height={104}
                            alt='ユーザー画像'
                            />
                        </Box>
                        <Box className={styles.layout_userWrapper}>
                            <Typography className={`${styles.layout_user} ${notoSansJP.className}`}>
                                たかぽん
                            </Typography>
                        </Box>
                        <List className={styles.layout_sidebarList}>
                            {
                                sidebarData.map((value, key) => {
                                    return (
                                        <ListItem
                                        key={key} 
                                        className={styles.layout_sidebarItem} 
                                        onClick={() => handleClickMode(value.link)}
                                        sx={
                                            activeJudge(value.link) === 'active' 
                                            ? 
                                            { backgroundColor: 'rgb(233, 139, 85)' } : { backgroundColor: 'rgb(240, 119, 49)' }
                                        }
                                        >
                                            <Box className={styles.layout_sidebarIcon}>
                                                {value.icon}
                                            </Box>
                                            <Box className={`${styles.layout_sidebarTitle} ${notoSansJP.className}`}>
                                                {value.title}
                                            </Box>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Box>
                { children }
            </Box>
        </Box>
    )
}

export default Layout;