import React from 'react';
import dynamic from 'next/dynamic';

const ResetForm = dynamic(() => import('../components/FormContent/ResetForm') ,
    {
        ssr: false,
    }
);

const Forgot = () => {
    return (
        <ResetForm />
    );
};

export default Forgot;