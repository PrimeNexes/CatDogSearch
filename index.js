/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import store from './src/store';

export default function Main() {
    return (
    <StoreProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
      </StoreProvider>
    );
  }
  
  AppRegistry.registerComponent(appName, () => Main);
