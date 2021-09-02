import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export default function createApolloClient(uri: string): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    uri,
    headers: {
      authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
    },
    connectToDevTools: true,
    cache: new InMemoryCache(),
  });
}
