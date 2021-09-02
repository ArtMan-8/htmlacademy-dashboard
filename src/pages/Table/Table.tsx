import React, { useContext, useState, useEffect } from 'react';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import useStyles from './table.styles';
import { generateRows, getComparator, headCells, IheadCells, Order, stableSort } from './helpers';
import { store } from '../../store/store';
import NotFound from '../../components/NotFound/NotFound';
import { useMediaQuery } from '@material-ui/core';

interface IEnhancedTableHead {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: IheadCells['id']) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: IEnhancedTableHead) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: IheadCells['id']) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.padding}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function Table(): JSX.Element {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-height: 950px)');

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<IheadCells['id']>('authorName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { state } = useContext(store);
  const { projects } = state;

  useEffect(() => {
    setRowsPerPage(isDesktop ? 20 : 10);
  }, [isDesktop]);

  if (projects.length === 0) {
    return <NotFound />;
  }

  const rows = generateRows(projects);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: IheadCells['id']) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <MuiTable className={classes.table} aria-labelledby="tableTitle" size={'small'} aria-label="enhanced table">
            <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />

            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.repoUrl}>
                      <TableCell component="th" id={labelId} scope="row">
                        <a href={row.authorUrl} target="_blank" rel="noreferrer">
                          {row.authorName}
                        </a>
                      </TableCell>

                      <TableCell align="left">
                        <a href={row.repoUrl} target="_blank" rel="noreferrer">
                          {row.repoName}
                        </a>
                      </TableCell>

                      <TableCell align="center">{row.lastCommit}</TableCell>

                      <TableCell component="th" id={labelId} scope="row">
                        <a href={row.mentorUrl} target="_blank" rel="noreferrer">
                          {row.mentorName}
                        </a>
                      </TableCell>

                      <TableCell component="th" id={labelId} scope="row">
                        <a href={row.lastPullRequestUrl} target="_blank" rel="noreferrer">
                          {row.lastPullRequestName}
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Записей на страницу"
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
