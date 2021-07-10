import React from 'react';
import useStyles from './header.styles';

export default function Header(): JSX.Element {
  const classes = useStyles();

  return <header className={classes.header} />;
}
