import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { ThemeProvider } from '@emotion/react';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'

import store from '../store';
import theme from '../style/theme';
import muiTheme from '../style/muiTheme';

import NormalizeStyle from '../style/normalize';
import GlobalStyle from '../style/global';

const AppWrapper = (props) => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={muiTheme}>
        <NormalizeStyle />
        <GlobalStyle />
        {props.children}
      </MuiThemeProvider>
    </ThemeProvider>
  </StoreProvider>
);

export default AppWrapper