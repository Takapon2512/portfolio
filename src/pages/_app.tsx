import type { AppProps } from 'next/app'
import { StyledEngineProvider } from '@mui/material/styles'

import 'modern-css-reset/dist/reset.min.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
  )
}
