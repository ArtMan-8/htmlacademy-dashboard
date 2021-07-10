import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../layouts/Main';
import Search from '../components/Search';

export default function App(): JSX.Element {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Search />
      </Layout>
    </>
  );
}
