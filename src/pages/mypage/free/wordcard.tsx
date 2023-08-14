import React, { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

//recoil
import { useRecoilState } from 'recoil';
import { sidebarState } from '@/store/layoutState';

//MUI
import { Box } from "@mui/material";

//CSS
import styles from "./wordcard.module.scss";

//Components
import Layout from '@/components/Layout/layout';
import WordCard from '@/components/freeComponent/WordCard/WordCard';

//type
import { SidebarType } from '@/types/globaltype';

const WordCardPage = () => {
  // //Router
  // const router: NextRouter = useRouter();

  // //サイドバーの情報を管理
  // const [sidebar, setSidebar] = useRecoilState<SidebarType[]>(sidebarState);
  // //サイドバーの情報をコピー
  // const sidebarArr: Array<SidebarType> = [...sidebar];
  // //フリーモードのオブジェクトをコピー
  // const prevFreeObj: SidebarType = sidebarArr[2];
  // //フリーモードのリンクを更新
  // const newFreeObj: SidebarType = { ...prevFreeObj, link: router.pathname };
  // //配列を更新
  // sidebarArr[2] = newFreeObj;

  // useEffect(() => {
  //   setSidebar(sidebarArr);
  // }, [])

  return (
    <Layout>
      <Box className={styles.free}>
        <Box className={styles.free_container}>
          <WordCard />
        </Box>
      </Box>
    </Layout>
  )
}

export default WordCardPage;