import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
      secondary: '#fff',
    },
    secondary: {
      main: '#fff',
    },
    text: {
      primary: '#fff',
    },
    background: {
      default: '#f7f7f7',
    },
  },
  typography: {
    htmlFontSize: 16,
    color: '#fff',
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 100,
    fontSize: 16,
    lineHeight: '145%',
    body1: {
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 100,
    },
    headline: {
      fontFamily: "'Open Sans', sans-serif",
      textTransform: 'uppercase',
      fontWeight: 100,
      color: '#999',
    },
  },
  maxContentWidth: 760,
  leftDrawerWidth: 320,
  leftDrawerWidthMin: 73,
  shadow: '1px 1px 0px 1px #e1e1e1',
});


export default theme;
