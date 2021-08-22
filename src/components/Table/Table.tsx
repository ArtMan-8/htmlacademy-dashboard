import React, { useContext, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import useStyles from './table.styles';
import { getComparator, Order, stableSort } from './helpers';
import { store } from '../../store/store';
import { INormalizedProject } from '../../App/normalize';

function generateRows(projects: INormalizedProject[]): {
  author: string;
  lastCommit: string;
  repository: string;
}[] {
  return projects.map(({ authorName, authorLogin, pushed, url }) => ({
    author: authorName ? `${authorName} aka ${authorLogin}` : authorLogin,
    lastCommit: pushed.slice(0, 10),
    repository: url,
  }));
}

interface IheadCells {
  id: 'author' | 'lastCommit' | 'repository';
  align: 'left' | 'center' | 'right';
  padding: 'none' | 'normal';
  label: string;
}

const headCells: IheadCells[] = [
  { id: 'author', align: 'left', padding: 'normal', label: 'Author' },
  { id: 'lastCommit', align: 'center', padding: 'normal', label: 'Last Commit' },
  { id: 'repository', align: 'left', padding: 'normal', label: 'Repository' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: IheadCells['id']) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
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

export default function DataTable(): JSX.Element {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<IheadCells['id']>('author');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { state } = useContext(store);
  const { projects } = state;

  if (projects.length === 0) {
    return <div style={{ textAlign: 'center' }}>repo not found</div>;
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
          <Table className={classes.table} aria-labelledby="tableTitle" size={'small'} aria-label="enhanced table">
            <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />

            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.repository}>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.author}
                      </TableCell>
                      <TableCell align="center">{row.lastCommit}</TableCell>
                      <TableCell align="left">
                        <a href={row.repository} target="_blank" rel="noreferrer">
                          {row.repository}
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
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
