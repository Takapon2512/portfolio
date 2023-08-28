import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

//MUI
import {
    Box,
    Typography,
    List,
    ListItem
} from '@mui/material';

//Icon
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import AlbumIcon from '@mui/icons-material/Album';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

//Font
import { notoSansJP } from '../../utils/font';

//CSS
import styles from './layout.module.scss';

//Image
import noImage from '../../../public/images/noImage.png';

//type
import { SidebarType } from '@/types/globaltype';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const sidebarArr: Array<SidebarType> = [
        {
            title: "ホーム",
            icon: <HomeIcon />,
            link: "/mypage",
            active: false
        },
        {
            title: "暗記モード",
            icon: <ViewListIcon />,
            link: "/mypage/memorization",
            active: false
        },
        {
            title: "フリーモード",
            icon: <FreeBreakfastIcon />,
            link: "/mypage/free",
            active: false
        },
        {
            title: "記録",
            icon: <AlbumIcon />,
            link: "/mypage/record",
            active: false
        },
        {
            title: "設定",
            icon: <SettingsIcon />,
            link: "/mypage/setting",
            active: false
        },
        {
            title: 'ログアウト',
            icon: <LogoutIcon />,
            link: '../login',
            active: false
        }
    ];

    const activeJudge = (value: SidebarType, index: number) => {
        if (router.pathname.includes(value.link) && index > 0) return true;
        if (router.pathname === value.link) return true;
        return false;
    };

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
                                sidebarArr.map((value: SidebarType, key: number) => 
                                    (
                                        <ListItem
                                        key={key} 
                                        className={styles.layout_sidebarItem} 
                                        onClick={() => router.push(value.link) }
                                        sx={
                                            activeJudge(value, key)
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
                                )
                            }
                        </List>
                    </Box>
                { children }
            </Box>
        </Box>
    )
}

export default Layout;