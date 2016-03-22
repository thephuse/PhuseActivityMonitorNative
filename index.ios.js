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
import StartDate from './components/StartDate'
import EndDate from './components/EndDate'
import PeriodFilters from './components/PeriodFilters'
import Sort from './components/Sort'
import Nav from './components/Nav'

const store = configureStore()

class PhuseActivityMonitorNative extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router hideNavBar={true}>
          <Route name="index" component={connect(mapStateToProps)(Timesheets)} initial={true} title="Activity" />
          <Route name="startDate" component={connect(mapStateToProps)(StartDate)} type="modal" title="Start Date" />
          <Route name="endDate" component={connect(mapStateToProps)(EndDate)} type="modal" title="End Date" />
          <Route name="period" component={connect(mapStateToProps)(PeriodFilters)} type="modal" title="Period" />
          <Route name="sort" component={connect(mapStateToProps)(Sort)} type="modal" title="Sort" />
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

console.ignoredYellowBox = ['Warning: Failed propType']
