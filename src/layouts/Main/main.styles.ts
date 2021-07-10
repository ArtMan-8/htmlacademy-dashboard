import { createStyles } from '@material-ui/core/styles';

export default createStyles({
  '@global': {
    '#root': {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    main: {},
    footer: {
      marginTop: 'auto',
    },
  },
});
