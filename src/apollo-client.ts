import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { useStore } from './controllers/store';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URI,
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors }) => {
  graphQLErrors?.forEach(({ extensions }) => {
    if (extensions?.exception?.status === 401) {
      // set state as unauthed
      useStore.setState({ unauthorized: true });
    }
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
});

export default client;
