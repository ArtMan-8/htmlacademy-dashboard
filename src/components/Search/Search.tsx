import React from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import useStyles from './search.styles';

export default function Search(): JSX.Element {
  const classes = useStyles();

  return (
    <Box className={classes.formContainer}>
      <Typography align="center">
        Введите название проекта и&nbsp;номер потока вида: <i>названиеПроекта-номерПотока</i>
        <br />
        например <b>keksobooking-23</b>
      </Typography>

      <form className={classes.form} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="htmlacademy project" variant="outlined" fullWidth />
      </form>
    </Box>
  );
}
