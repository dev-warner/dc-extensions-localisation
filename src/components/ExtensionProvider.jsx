import React, { createContext } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

export const ExtensionContext = createContext(null);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#039be5'
    }
  }
});

export function ExtensionProvider({ children, value }) {
  return (
    <ThemeProvider theme={theme}>
      <ExtensionContext.Provider value={value}>
        <div className="App">
          {children}
        </div>
      </ExtensionContext.Provider>
    </ThemeProvider>
  )
}