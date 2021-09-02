import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Typography, Link, AppBar } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import { GET_RATE_LIMIT } from '../../graphql/GetRateLimit.query';
import { actionCreate, EActionType } from '../../store/types';
import { store } from '../../store/store';
import useStyles from './footer.styles';
import { Author } from '../../constants';

export default function Footer(): JSX.Element {
  const classes = useStyles();

  const [isError, setError] = useState(false);

  const { state, dispatch } = useContext(store);
  const { requestLimit } = state;

  const { data, error } = useQuery(GET_RATE_LIMIT, {
    onCompleted() {
      dispatch(actionCreate(EActionType.SET_REQUEST_LIMIT, { requestLimit: data.rateLimit.remaining }));
    },
  });

  const handleClose = () => {
    setError(false);
  };

  useEffect(() => {
    if (error) {
      setError(true);
    }
  }, [error]);

  return (
    <AppBar component="footer" position="static" color="primary" className={classes.appBar}>
      <Typography align="center">
        Создал{' '}
        <b>
          <Link color="inherit" href={Author.URL} target="_blank" className={classes.author}>
            {Author.NAME}
          </Link>
        </b>
      </Typography>

      <Typography align="center">
        лимит запросов: <b>{requestLimit || '...'}</b>
      </Typography>

      <Snackbar open={isError} autoHideDuration={5000} onClose={handleClose} TransitionComponent={Slide}>
        <Alert onClose={handleClose} severity="error">
          Ошибка загрузки данных
        </Alert>
      </Snackbar>
    </AppBar>
  );
}
