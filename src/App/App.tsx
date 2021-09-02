import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline, withStyles } from '@material-ui/core';

import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import styles from './app.styles';
import Search from '../pages/Search';
import Table from '../pages/Table';
import Charts from '../pages/Charts';

export default withStyles(styles)(function App(): JSX.Element {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Main>
          <Switch>
            <Route path="/charts" component={Charts} />
            <Route path="/table" render={() => <Table />} />
            <Route path="/" component={Search} />
          </Switch>
        </Main>
        <Footer />
      </BrowserRouter>
    </>
  );
});
