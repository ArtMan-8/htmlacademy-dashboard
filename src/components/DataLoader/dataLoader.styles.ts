import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() =>
  createStyles({
    dataLoader: {
      margin: 20,
      padding: 20,
    },
    progressBar: {
      margin: 20,
    },
    button: {
      margin: 5,
    },
    note: {
      marginTop: 20,
      fontSize: 12,
    },
  }),
);
