import type { AppProps } from 'next/app';
import { StyledEngineProvider } from '@mui/material/styles';
import { RecoilRoot } from 'recoil';
import 'modern-css-reset/dist/reset.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <Component {...pageProps} />
      </StyledEngineProvider>
    </RecoilRoot>
  )
}
