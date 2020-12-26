import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './views/Main';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const wrapperStyle={
    padding:"20px",
    "font-size":"1.25rem"
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div style={wrapperStyle}>
      <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;