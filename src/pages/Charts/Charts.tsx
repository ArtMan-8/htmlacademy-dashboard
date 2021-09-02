import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { store } from '../../store/store';
import NotFound from '../../components/NotFound';
import useStyles from './charts.styles';

export default function Charts(): JSX.Element {
  const classes = useStyles();

  const { state } = useContext(store);
  const { projects } = state;

  if (projects.length === 0) {
    return <NotFound />;
  }

  return (
    <Paper className={classes.charts}>
      <Typography align="center" className={classes.note}>
        Графики только готовятся...
        <br />
        будут позже
      </Typography>
    </Paper>
  );
}
