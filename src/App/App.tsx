import React from 'react';
import { gql, useQuery } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../layouts/Main';
import Search from '../components/Search';

const testQuery = gql`
  query {
    rateLimit {
      limit
    }
  }
`;

export default function App(): JSX.Element {
  const { loading, error, data } = useQuery(testQuery);

  return (
    <>
      <CssBaseline />
      <Layout>
        <Search />
      </Layout>
    </>
  );
}
