import React from "react";
import dynamic from "next/dynamic";

const Form = dynamic(() => import('../components/FormContent/Form') ,
    {
        ssr: false,
    }
);

const Login = () => {

    return (
        <>
        <Form 
        formTitle="アプリにログインする" 
        buttonTitle="ログイン" 
        changeTitle="アカウントをお持ちでない方はこちら"
        />
        </>
    );
};

export default Login;