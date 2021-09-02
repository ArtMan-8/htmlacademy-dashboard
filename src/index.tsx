import React from 'react';
import ReactDom from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import StateProvider from './store/store';
import App from './App';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
  },
  connectToDevTools: true,
  cache: new InMemoryCache(),
});

ReactDom.render(
  <ApolloProvider client={client}>
    <StateProvider>
      <App />
    </StateProvider>
  </ApolloProvider>,
  document.querySelector('#root'),
);
