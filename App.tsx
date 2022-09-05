/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { store } from './src/Store/Store'
import { Provider } from 'react-redux'

import Routes from './src/Routes/Index';

const App = () => {
  return (
    //The <Provider> component makes the Redux store available to any nested components that need to access the Redux store.
    <Provider store={store}>
      <Routes />
      </Provider>
  );
};

export default App;
