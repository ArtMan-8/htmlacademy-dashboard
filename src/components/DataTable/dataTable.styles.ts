import { createStyles, makeStyles } from '@material-ui/core/styles';

export default makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      margin: '20px',
    },
    table: {
      minWidth: 1000,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);
