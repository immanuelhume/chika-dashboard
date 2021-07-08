import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import client from '../apollo-client';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider
      preventDuplicate
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <ApolloProvider client={client}>
        <CssBaseline />
        <Component {...pageProps} />
      </ApolloProvider>
    </SnackbarProvider>
  );
}
