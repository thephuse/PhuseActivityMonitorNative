'use strict'

import { Provider } from 'react-redux'
import React, {
  AppRegistry,
  Component
} from 'react-native'

import configureStore from './store'
import Routes from './components/Routes'

console.ignoredYellowBox = ['Warning: Failed propType']

const store = configureStore()

class PhuseActivityMonitorNative extends Component {

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }

}

AppRegistry.registerComponent('PhuseActivityMonitorNative', () => PhuseActivityMonitorNative);
