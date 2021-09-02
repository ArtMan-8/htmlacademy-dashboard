import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    search: {
      margin: '20px auto',
      maxWidth: 600,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 20,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 4,
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    inputNumber: {
      '& input': {
        textAlign: 'center',
      },
    },
    submit: {
      margin: '30px auto',
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
