import React from 'react';
import { withStyles } from '@material-ui/core';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Footer from '../../components/Footer';
import styles from './main.styles';

interface ILayout {
  children: React.ReactNode;
}

export default withStyles(styles)(function Layout({
  children,
}: ILayout): JSX.Element {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
});
