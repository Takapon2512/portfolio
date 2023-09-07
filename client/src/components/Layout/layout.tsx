import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

//lib
import apiClient from '@/lib/apiClient';

//context
import { useAuth } from '@/context/auth';

//MUI
import {
    Box,
    Typography,
    List,
    ListItem,
    Button
} from '@mui/material';

//Icon
import HomeIcon from '@mui/icons-material/Home';
import ViewListIcon from '@mui/icons-material/ViewList';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import AlbumIcon from '@mui/icons-material/Album';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

//Font
import { notoSansJP } from '../../utils/font';

//CSS
import styles from './layout.module.scss';

//type
import { ResUserType, SidebarType } from '@/types/globaltype';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [userData, setUserData] = useState<ResUserType | null>(null);
    const [sideOn, setSideOn] = useState<boolean>(false);

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
            link: '/login',
            active: false
        }
    ];

    const activeJudge = (value: SidebarType, index: number) => {
        if (router.pathname.includes(value.link) && index > 0) return true;
        if (router.pathname === value.link) return true;
        return false;
    };

    const handleAction = async (value: SidebarType) => {
        //ユーザーがテスト画面や満点でないまま結果画面を離れたときに対処する処理
        await apiClient.post("/posts/db_reset");

        if (value.link === "/login") logout();
        router.push(value.link);
    };

    useEffect(() => {
        setUserData(user);
    }, [user]);

    console.log(sideOn);

    return (
        <Box 
        className={styles.layout}
        >
            <Box 
            className={styles.layout_container}
            >
                    <Box 
                    className={styles.layout_sidebar}
                    sx={{
                        translate: { xs: sideOn ? "-168px" : "0px", md: "0px"},
                        position: { xs: "absolute", md: "static" },
                        width: { xs: "168px", md: "248px" }
                    }}
                    >
                        <Box className={styles.layout_imageWrapper}>
                            <Image 
                            //Imageタグのレスポンシブはscssファイルに記入
                            className={styles.layout_image}
                            src={`/images/${'noImage.png'}`}
                            width={104}
                            height={104}
                            alt='ユーザー画像'
                            />
                        </Box>
                        <Box className={styles.layout_userWrapper}>
                            <Typography 
                            className={`${styles.layout_user} ${notoSansJP.className}`}
                            //続きはここから
                            >
                                { userData ? userData.username + "さん" : "名無し さん" }
                            </Typography>
                        </Box>
                        <List className={styles.layout_sidebarList}>
                            {
                                sidebarArr.map((value: SidebarType, key: number) => 
                                    (
                                        <ListItem
                                        key={key} 
                                        className={styles.layout_sidebarItem} 
                                        onClick={() => handleAction(value) }
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
                <Box
                sx={{
                    position: "absolute",
                    display: { xs: "block", md: "none" },
                    right: 24,
                    bottom: 24
                }}
                >
                    <Button 
                    className={styles.layout_sidebarControl}
                    onClick={() => setSideOn(!sideOn)}
                    >
                        {
                            sideOn 
                            ? <MenuIcon className={styles.layout_sidebarControlIcon} /> 
                            : <CloseIcon className={styles.layout_sidebarControlIcon} />
                        }
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;