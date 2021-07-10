import React from 'react';
import { Typography, Link } from '@material-ui/core';
import useStyles from './footer.styles';

export default function Footer(): JSX.Element {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography>
        edited by{' '}
        <b>
          <Link href="https://github.com/ArtMan-8">ArtMan-8</Link>
        </b>
      </Typography>
    </footer>
  );
}
