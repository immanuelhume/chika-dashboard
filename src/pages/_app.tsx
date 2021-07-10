import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import React, { useCallback } from 'react';
import client from '../apollo-client';
import { LoginPrompt } from '../components/molecules/LoginPrompt';
import { useStore } from '../controllers/store';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { unauthorized, prefersDark } = useStore(
    useCallback(
      // eslint-disable-next-line no-shadow
      ({ unauthorized, prefersDark }) => ({ unauthorized, prefersDark }),
      [],
    ),
  );

  const theme = responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: prefersDark ? 'dark' : 'light',
        primary: {
          main: '#ef5e91',
          light: '#ff91c1',
          dark: '#b92864',
        },
        secondary: {
          main: '#f48fb1',
          light: '#ffc1e3',
          dark: '#bf5f82',
        },
      },
    }),
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider preventDuplicate>
        <ApolloProvider client={client}>
          <CssBaseline />
          <Component {...pageProps} />
          <LoginPrompt open={!!unauthorized} />
        </ApolloProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
