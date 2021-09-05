import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() =>
  createStyles({
    notFound: {
      margin: '20px auto',
      padding: 20,
      width: 'max-content',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 500,
    },
    button: {
      margin: '20px auto 0',
    },
  }),
);
