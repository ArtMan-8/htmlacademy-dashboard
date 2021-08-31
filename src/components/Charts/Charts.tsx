import React, { useContext } from 'react';
import { store } from '../../store/store';
import NotFound from '../NotFound';
import useStyles from './charts.styles';

export default function Charts(): JSX.Element {
  const classes = useStyles();

  const { state } = useContext(store);
  const { projects } = state;

  if (projects.length === 0) {
    return <NotFound />;
  }

  return <div className={classes.charts}>Charts</div>;
}
