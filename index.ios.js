'use strict'

import { Provider } from 'react-redux'
import React, {
  AsyncStorage,
  AppRegistry,
  Component
} from 'react-native'

import configureStore from './store'
import App from './containers/App'
const store = configureStore()

class PhuseActivityMonitorNative extends Component {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }

}

AppRegistry.registerComponent('PhuseActivityMonitorNative', () => PhuseActivityMonitorNative);
