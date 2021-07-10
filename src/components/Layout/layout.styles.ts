import { createStyles } from '@material-ui/core/styles';

export default createStyles({
  '@global': {
    '#root': {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    header: {
      backgroundColor: '#2d2d44',
    },
    main: {},
    footer: {
      marginTop: 'auto',
      backgroundColor: '#2d2d44',
    },
  },
});
