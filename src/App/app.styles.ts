import { createStyles } from '@material-ui/core/styles';

export default createStyles({
  '@global': {
    '#root': {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    },
    header: {},
    main: {},
    footer: {
      marginTop: 'auto',
    },
  },
});
