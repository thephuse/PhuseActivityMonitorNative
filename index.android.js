'use strict'

import React, {
  AppRegistry,
  Component
} from 'react-native'

import {
  connect,
  Provider
} from 'react-redux'

import {
  Router,
  Route
} from 'react-native-router-flux'

import configureStore from './store'
import Timesheets from './components/Timesheets'
import Nav from './components/Nav'

const store = configureStore()

class PhuseActivityMonitorNative extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router hideNavBar={true}>
          <Route name="index" component={connect(mapStateToProps)(Timesheets)} initial={true} title="Activity" />
          <Route name="nav" component={connect(mapStateToProps)(Nav)} type="modal" title="Nav" />
        </Router>
      </Provider>
    )
  }

}

function mapStateToProps(state) {
  return state.timesheets
}

AppRegistry.registerComponent('PhuseActivityMonitorNative', () => PhuseActivityMonitorNative);
