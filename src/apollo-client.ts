import { ApolloClient, InMemoryCache } from '@apollo/client';

// TODO: set up apollo-link to handle global errors

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_API_URI,
  credentials: 'include',
});

export default client;
