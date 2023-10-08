import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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
import styles from "./ResetForm.module.scss";

//Font
import { notoSansJP } from '@/utils/font';

//lib
import apiClient from "@/lib/apiClient";

//component
import ResetAlert from './alert/resetAlert';

//type
type submitType = {
    email: string;
};

//schema
const schema = yup.object({
    email: yup
      .string()
      .required('必須項目です')
      .email('正しいメールアドレスを入力してください')
});

const ResetForm = () => {
    const router = useRouter();
    const [mail, setMail] = useState<string>("");
    const [alertFlag, setAlertFlag] = useState<string>("");

    //useForm
    const { register, handleSubmit, formState: { errors } } = useForm<submitType>({
        resolver: yupResolver(schema)
    });

    const handleMail = (e: React.ChangeEvent<HTMLInputElement>) => setMail(e.target.value); 

    const onSubmit: SubmitHandler<submitType> = async (data) => {
        console.log(data);

        try {
            await apiClient.post("/auth/reset-password", {
                email: mail
            });

            setAlertFlag("成功");
        } catch (err) {
            console.error(err);
            setAlertFlag("失敗");
        };
    };

    return (
        <>
        <ResetAlert alertFlag={alertFlag} />
        <Box className={styles.resetform}>
            <Box className={styles.resetform_container}>
                <Typography
                variant="h2"
                className={`${notoSansJP.className} ${styles.resetform_title}`}
                >
                    パスワードをリセットする
                </Typography>
                <Stack component={"form"}>
                    <TextField 
                    className={`${notoSansJP.className} ${styles.resetform_emailText}`}
                    required
                    label="メールアドレス"
                    type="email"
                    { ...register("email") }
                    error={"email" in errors}
                    helperText={errors.email?.message}
                    onChange={handleMail}
                    value={mail}
                    />
                    <Button
                    className={`${notoSansJP.className} ${styles.resetform_button}`}
                    onClick={handleSubmit(onSubmit)}
                    >
                        リセットメールを送信
                    </Button>
                    <Button
                    className={`${notoSansJP.className} ${styles.resetform_change}`}
                    onClick={() => router.push("/login")}
                    >
                        ログインする
                    </Button>
                </Stack>
            </Box>
        </Box>
        </>
    );
};

export default ResetForm;