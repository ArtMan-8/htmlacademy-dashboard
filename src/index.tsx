import React from 'react';
import ReactDom from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import StoreProvider from './store/store';
import App from './App';
import createApolloClient from './api/apollo.config';
import { GITHUB_GRAPHQL_ENDPOINT } from './constants';

ReactDom.render(
  <ApolloProvider client={createApolloClient(GITHUB_GRAPHQL_ENDPOINT)}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </ApolloProvider>,
  document.querySelector('#root'),
);
