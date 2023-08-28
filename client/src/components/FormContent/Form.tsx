import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//react-hook-form
import { 
    useForm, 
    SubmitHandler 
} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

//MUI
import {
    Button,
    Stack,
    TextField,
    Typography,
    Box
} from '@mui/material';

//CSS
import styles from './Form.module.scss';

//Font
import { notoSansJP } from "@/utils/font";

//Type
import { LoginType } from "@/types/globaltype";

//Image
import googleBtn from '../../../public/google_btn.png';

//lib
import apiClient from "@/lib/apiClient";

//context
import { useAuth } from "@/context/auth";

//schema
const schema = yup.object({
    email: yup
      .string()
      .required('必須項目です')
      .email('正しいメールアドレスを入力してください'),
    name: yup.string().required('必須項目です'),
    password: yup
      .string()
      .required('必須項目です')
      .min(7, '7文字以上で入力してください')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/,
        '英数字と記号を利用してください'
    )
})

const Form = ({formTitle, buttonTitle, changeTitle}: {formTitle: string, buttonTitle: string, changeTitle: string}) => {

    //useState
    const [formText, setFormText] = useState<LoginType>({
        email: '',
        name: '',
        password: ''
    });

    //useRouter
    const router = useRouter()

    //useAuth
    const { login } = useAuth();

    //テキストフィールドの変化を追跡
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormText((text) => ({...text, email: e.target.value}));
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormText((text) => ({...text, name: e.target.value}));
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormText((text) => ({...text, password: e.target.value}));

    //useForm
    const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({
        resolver: yupResolver(schema)
    });

    //ボタンを押したときの処理
    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        console.log(data);

        if (router.pathname === "/register") {
            registerAndLogin("/auth/register");
        } else if (router.pathname === "/login") {
            registerAndLogin("/auth/login");
        };

        setFormText({
            email: "",
            name: "",
            password: ""
        });
    };

    const registerAndLogin = async (path: string) => {
        try {
            const response = await apiClient.post(path, {
                name: formText.name,
                email: formText.email,
                password: formText.password
            });

            const token: string = response.data.token;
            console.log(token);

            login(token);

            router.push("./mypage");
        } catch (err) {
            console.error(err);
            alert("入力内容が正しくありません。");
        };
    };

    const handleFormChange = () => {
        if (changeTitle === 'アカウントをお持ちでない方はこちら') {
            router.push("./register");
        } else if (changeTitle === 'アカウントをお持ちの方はこちら') {
            router.push("./login");
        };
    };

    return (
        <>
        <Box className={styles.form}>
            <Box className={styles.form_container}>
                <Typography
                variant="h2"
                className={`${notoSansJP.className} ${styles.form_title}`}
                >
                    {formTitle}
                </Typography>
                <Stack 
                component='form'
                >
                    <TextField 
                    className={`${notoSansJP.className} ${styles.form_emailText}`}
                    required
                    label="メールアドレス"
                    type="email"
                    { ...register("email") }
                    error={"email" in errors}
                    helperText={errors.email?.message}
                    onChange={handleEmailChange}
                    value={formText.email}
                    />
                    <TextField 
                    className={`${notoSansJP.className} ${styles.form_nameText}`}
                    required
                    label="ユーザー名"
                    { ...register("name") }
                    error={"name" in errors}
                    helperText={errors.name?.message}
                    onChange={handleNameChange}
                    value={formText.name}
                    />
                    <TextField 
                    className={`${notoSansJP.className} ${styles.form_passwordText}`}
                    required
                    label="パスワード"
                    type="password"
                    { ...register("password") }
                    error={"password" in errors}
                    helperText={errors.password?.message}
                    onChange={handlePasswordChange}
                    value={formText.password}
                    />
                    <Button
                    className={`${notoSansJP.className} ${styles.form_button}`}
                    onClick={handleSubmit(onSubmit)}
                    >
                        {buttonTitle}
                    </Button>
                    <Button
                    className={`${notoSansJP.className} ${styles.form_change}`}
                    onClick={handleFormChange}
                    >
                        {changeTitle}
                    </Button>
                </Stack>
                <Typography
                className={`${notoSansJP.className} ${styles.form_another}`}
                >
                    Googleアカウントをお持ちの方はこちら
                </Typography>
                <Button
                className={`${notoSansJP.className} ${styles.form_google}`}
                >
                    <Image
                    width={191}
                    height={46}
                    src={googleBtn}
                    alt='Googleボタン'
                    id='googleBtn'
                    />
                </Button>
            </Box>
        </Box>
        </>
    );
};

export default Form;