import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app';
import client from '../apollo-client';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
