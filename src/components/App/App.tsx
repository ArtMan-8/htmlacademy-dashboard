import React from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import Layout from '../Layout';
import useStyles from './app.styles';

export default function App(): JSX.Element {
  const classes = useStyles();

  return (
    <Layout>
      <Box className={classes.formContainer}>
        <Typography>
          Введите название проекта и номер потока вида:
          <br />
          <i>названиеПроекта-номерПотока</i>
          <br />
          например <b>keksobooking-23</b>
        </Typography>

        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="htmlacademy project"
            variant="outlined"
            fullWidth
          />
        </form>
      </Box>
    </Layout>
  );
}
