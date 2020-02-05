import './style/main.css';


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './style/theme';
import App from './containers/app';
import * as serviceWorker from './serviceWorker';


const render = (Component) => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Component />
    </MuiThemeProvider>,
    document.getElementById('root'),
  )
}
render(App);
serviceWorker.unregister();
