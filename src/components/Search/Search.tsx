import React, { useContext, useState } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import { store } from '../../store';
import useStyles from './search.styles';

export default function Search(): JSX.Element {
  const classes = useStyles();
  const [projectName, setProjectName] = useState('');
  const { dispatch } = useContext(store);

  const onQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };

  const onQuerySubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProjectName('');

    dispatch({
      type: 'SET_PROJECT_NAME',
      payload: { projectName },
    });

    dispatch({
      type: 'CLEAR_REPOSITORIES',
    });
  };

  return (
    <Box className={classes.formContainer}>
      <Typography align="center">
        Введите название проекта и&nbsp;номер потока вида: <i>названиеПроекта-номерПотока</i>
        <br />
        например <b>keksobooking-23</b>
      </Typography>

      <form className={classes.form} noValidate autoComplete="off" onSubmit={onQuerySubmit}>
        <TextField
          id="outlined-basic"
          label="htmlacademy project"
          variant="outlined"
          fullWidth
          value={projectName}
          onChange={onQueryInput}
        />
      </form>
    </Box>
  );
}
