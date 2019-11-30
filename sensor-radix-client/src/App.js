import React from 'react';
import MaterialTabs from './components/MaterialTabs'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    // type: 'dark', // TODO: Implementar lógica p dark theme
    primary: purple,
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <MaterialTabs />
    </ThemeProvider>
  );
}

export default App;
