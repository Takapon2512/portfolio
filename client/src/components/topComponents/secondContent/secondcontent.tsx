import React from "react";
import Image from "next/image";

//MUI
import { 
    Box,
    Typography,
    Link,
    List,
    ListItem
} from '@mui/material';

//MUIIcon


//Font
import { notoSansJP } from "@/utils/font";

//CSS
import styles from './secondcontent.module.scss';

//Image
import eStudy01 from '../../../../public/e-study_img01.jpg';

//type
type ChallengesType = {
    icon: React.JSX.Element,
    text: string
}

const SecondContent = () => {
    //#66530B
    const challenges: ChallengesType[] = [
        {
            icon: <Image className={styles.secC_image} width={72} height={72} src="/images/cry_man.png" alt="英単語が多くて覚えられない" />,
            text: "英単語が多くて覚えられない..."
        },
        {
            icon: <Image className={styles.secC_image} width={72} height={72} src="/images/study_woman.png" alt="覚えた単語と覚えていない単語の管理ができない" />,
            text: "覚えた単語と覚えていない単語の管理ができない..."
        },
        {
            icon: <Image className={styles.secC_image} width={72} height={72} src="/images/pc_man.png" alt="実際は暗記できていないのにアプリでは暗記済みになっている" />,
            text: "実際は暗記できていないのにアプリでは暗記済みになっている..."
        }
    ]

    return (
        <>
        <Box className={styles.secC}>
            <Box className={styles.secC_container}>
                <Typography 
                variant="h2"
                className={`${notoSansJP.className} ${styles.secC_title}`}
                >
                    このような<Box className={styles.secC_emphasis} component={'span'}>課題</Box>はありませんか？
                </Typography>
                <List className={styles.secC_Lists}>
                    {
                        challenges.map((item: ChallengesType, index: number) => (
                            <ListItem key={index} className={styles.secC_Item}>
                                <Typography className={`${notoSansJP.className} ${styles.secC_case}`}>
                                    {`Case 0${index + 1}`}
                                </Typography>
                                { item.icon }
                                <Typography className={`${notoSansJP.className} ${styles.secC_Text}`}>
                                    { item.text }
                                </Typography>
                            </ListItem>
                        ))
                    }
                </List>
                <Box className={styles.secC_triangle}></Box>
            </Box>
        </Box>
        </>
    )
};

export default SecondContent;