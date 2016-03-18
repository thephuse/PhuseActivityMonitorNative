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
import sort from './helpers/sort'
import sortByValues from './helpers/sortByValues'
import Timesheets from './components/Timesheets'

const store = configureStore()

class PhuseActivityMonitorNative extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router hideNavBar={true}>
          <Route name="index" component={connect(mapStateToProps)(Timesheets)} initial={true} title="Activity" />
        </Router>
      </Provider>
    )
  }

}

function mapStateToProps(state) {
  const {
    sortBy,
    startDate,
    endDate,
    period,
    isFetching,
    times,
    calendar,
    cookieValid,
    nav
  } = state.timesheets

  return {
    sortBy,
    startDate,
    endDate,
    period,
    isFetching,
    sortByValues,
    calendar,
    cookieValid,
    nav,
    times: sort(times, sortBy)
  }
}

AppRegistry.registerComponent('PhuseActivityMonitorNative', () => PhuseActivityMonitorNative);

console.ignoredYellowBox = ['Warning: Failed propType']
