import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() =>
  createStyles({
    appBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    author: {
      color: 'white',
      textDecoration: 'underline',
      '&:hover': {
        opacity: 0.7,
      },
    },
  }),
);
