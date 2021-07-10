import React from 'react';
import { withStyles } from '@material-ui/core';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import styles from './layout.styles';

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout): JSX.Element {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default withStyles(styles)(Layout);
