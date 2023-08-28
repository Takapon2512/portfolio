import React from "react";

//Component
import Header from "@/components/header/Header";
import FirstContent from "@/components/topComponents/firstContent/firstcontent";
import SecondContent from "@/components/topComponents/secondContent/secondcontent";
import ThirdContent from "@/components/topComponents/thirdContent/thirdcontent";
import ForthContent from "@/components/topComponents/forthContent/forthcontent";
import FifthContent from "@/components/topComponents/fifthContent/fifthcontent";
import SixthContent from "@/components/topComponents/sixthContent/sixthcontent";
import SeventhContent from "@/components/topComponents/seventhContent/seventhcontent";
import Footer from "@/components/footer/Footer";

const Top = () => {
  return (
    <>
    <Header />
    <FirstContent />
    <SecondContent />
    <ThirdContent />
    <ForthContent />
    <FifthContent />
    <SixthContent />
    <SeventhContent />
    <Footer />
    </>
  )

};

export default Top;