import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    selectProjectContainer: {
      display: 'flex',
      flexDirection: 'column',
      margin: '20px auto',
      maxWidth: 600,
    },
    inputNumber: {
      '& input': {
        textAlign: 'center',
      },
    },
    submit: {
      margin: '30px auto 10px',
      width: 'max-content',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: '100%',
      textAlign: 'center',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);
