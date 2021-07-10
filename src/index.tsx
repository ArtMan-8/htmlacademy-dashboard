import React from 'react';
import ReactDom from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './components/App';

ReactDom.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.querySelector('#root'),
);
