import React from 'react';
import Paper from '@material-ui/core/Paper';
import useStyles from './notFound.styles';

export default function NotFound(): JSX.Element {
  const classes = useStyles();

  return <Paper className={classes.notFound}>Репозитории не найдены</Paper>;
}
