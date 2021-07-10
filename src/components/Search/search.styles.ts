import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() =>
  createStyles({
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
      padding: 25,
    },
    form: {
      margin: 'auto',
      width: '100%',
      maxWidth: 450,
      '& input': {
        textAlign: 'center',
      },
    },
  }),
);
