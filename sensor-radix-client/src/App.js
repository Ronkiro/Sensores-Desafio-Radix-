import React from 'react';
import MaterialTabs from './components/MaterialTabs'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import FirstTab from './components/FirstTab'
import SecondTab from './components/SecondTab'
import ThirdTab from './components/ThirdTab'

const theme = createMuiTheme({
  palette: {
    // type: 'dark', // TODO: Implementar lógica p dark theme
    primary: purple,
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <MaterialTabs 
        TabComponent1={ <FirstTab /> }
        TabComponent2={ <SecondTab />}
        TabComponent3={ <ThirdTab /> }
      />
    </ThemeProvider>
  );
}

export default App;
