import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { useCallback } from 'react';
import client from '../apollo-client';
import { LoginPrompt } from '../components/molecules/LoginPrompt';
import { useStore } from '../controllers/store';

export default function MyApp({ Component, pageProps }: AppProps) {
  const unauthorized = useStore(useCallback((state) => state.unauthorized, []));
  return (
    <SnackbarProvider preventDuplicate>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Component {...pageProps} />
        <LoginPrompt open={!!unauthorized} />
      </ApolloProvider>
    </SnackbarProvider>
  );
}
