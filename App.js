console.disableYellowBox = true;
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store/index';
import Navigator from './src/navigator/index';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }
}