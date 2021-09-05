import React, { useContext, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import { store } from '../../store/store';
import NotFoundRepo from '../../components/NotFoundRepo';
import useStyles from './charts.styles';
import { getDataForDoughnutChart } from './helpers';

export default function Charts(): JSX.Element {
  const classes = useStyles();
  const refDoughnut = useRef();

  const { state } = useContext(store);
  const { projects } = state;

  if (projects.length === 0) {
    return <NotFoundRepo />;
  }

  const { data, options } = getDataForDoughnutChart(projects);

  return (
    <Paper className={classes.charts}>
      <Doughnut ref={refDoughnut} data={data} options={options} />
    </Paper>
  );
}
