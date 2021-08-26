import React, { useContext } from 'react';
import { Typography, Link } from '@material-ui/core';
import { store } from '../../store/store';
import useStyles from './footer.styles';

export default function Footer(): JSX.Element {
  const classes = useStyles();
  const { state } = useContext(store);

  return (
    <footer className={classes.footer}>
      <Typography>
        created by{' '}
        <b>
          <Link href="https://github.com/ArtMan-8">ArtMan-8</Link>
        </b>
      </Typography>

      <Typography>
        request limit - <b>{state?.requestLimit || '...'}</b>
      </Typography>
    </footer>
  );
}
