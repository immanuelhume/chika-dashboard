import { ApolloProvider } from '@apollo/client';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { useCallback } from 'react';
import client from '../apollo-client';
import { LoginPrompt } from '../components/molecules/LoginPrompt';
import { useStore } from '../controllers/store';
import theme from '../theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  const unauthorized = useStore(useCallback((state) => state.unauthorized, []));
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider preventDuplicate>
        <ApolloProvider client={client}>
          <CssBaseline />
          <Component {...pageProps} />
          <LoginPrompt open={!!unauthorized} />
        </ApolloProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}
