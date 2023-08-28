import type { AppProps } from 'next/app';
import { StyledEngineProvider } from '@mui/material/styles';
import { RecoilRoot } from 'recoil';
import 'modern-css-reset/dist/reset.min.css';

//context
import { AuthProvider } from '@/context/auth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <StyledEngineProvider injectFirst>
          <Component {...pageProps} />
        </StyledEngineProvider>
      </AuthProvider>
    </RecoilRoot>
  );
};
