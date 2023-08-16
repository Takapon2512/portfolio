import React, { useState, useEffect } from 'react';

//MUI
import { 
    Box,
    Typography,
    CircularProgress 
} from '@mui/material';

//utils
import { notoSansJP } from '@/utils/font';

const CircularResultLabel = ({ correct, questionNum }: { correct: number, questionNum: number }) => {
    //表示する正答率
    const [displayRate, setDisplayRate] = useState<number>(0);

    //正答率
    const correctRate: number = Math.ceil(correct / questionNum * 100);

    useEffect(() => {
        if (displayRate <= correctRate) {
            const timer: NodeJS.Timer = setInterval(() => {
                setDisplayRate((prev) => prev < correctRate ? prev + 2 : correctRate);
            }, 50);
            return () => {
                clearInterval(timer);
            };
        };
    }, []);

    return (
        <>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant='determinate' size={240} thickness={5.6} value={displayRate} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                    <Typography
                    component="div"
                    className={notoSansJP.className}
                    sx={{userSelect: "none", fontSize: "50px"}}
                    >
                        { `${displayRate}%` }
                    </Typography>
            </Box>
        </Box>
        </>
    );
};

export default CircularResultLabel;