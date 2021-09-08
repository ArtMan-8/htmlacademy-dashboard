import React, { useContext } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Paper from '@material-ui/core/Paper';
import NotFoundRepo from '../../components/NotFoundRepo';
import { store } from '../../store/store';
import getRowsForDataGrid, { columns } from './helpers';
import useStyles from './mentors.styles';

export default function Mentor(): JSX.Element {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-height: 950px)');

  const { state } = useContext(store);
  const { projects } = state;

  if (projects.length === 0) {
    return <NotFoundRepo />;
  }

  const rows = getRowsForDataGrid(projects);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{ height: isDesktop ? 650 : 400 }}>
        <DataGrid rows={rows} columns={columns} pageSize={isDesktop ? 10 : 5} disableSelectionOnClick />
      </Paper>
    </div>
  );
}
