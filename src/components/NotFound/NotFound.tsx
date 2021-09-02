import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import useStyles from './notFound.styles';

export default function NotFound(): JSX.Element {
  const classes = useStyles();

  return (
    <Paper className={classes.notFound}>
      Репозитории не найдены
      <br />
      <Button
        variant="contained"
        color="primary"
        endIcon={<SearchIcon />}
        component={Link}
        to="/"
        className={classes.button}
      >
        найти
      </Button>
    </Paper>
  );
}
