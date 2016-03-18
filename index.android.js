'use strict'

import React, {
  AppRegistry,
  Component,
  Navigator
} from 'react-native'

import {
  connect,
  Provider
} from 'react-redux'

import {
  Router,
  Route,
  Schema
} from 'react-native-router-flux'

import configureStore from './store'
import sort from './helpers/sort'
import sortByValues from './helpers/sortByValues'
import Timesheets from './components/Timesheets'
// import StartDate from './components/StartDate.iOS'
// import EndDate from './components/EndDate.iOS'
// import PeriodFilters from './components/PeriodFilters'
import Sort from './components/Sort'
import Nav from './components/Nav'

const store = configureStore()

class PhuseActivityMonitorNative extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router hideNavBar={true}>
          <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} />
          <Route name="index" component={connect(mapStateToProps)(Timesheets)} initial={true} title="Activity" />
          {/*<Route name="startDate" component={connect(mapStateToProps)(StartDate)} type="modal" title="Start Date" />*/}
          {/*<Route name="endDate" component={connect(mapStateToProps)(EndDate)} type="modal" title="End Date" />*/}
          {/*<Route name="period" component={connect(mapStateToProps)(PeriodFilters)} type="modal" title="Period" />*/}
          <Route name="sort" component={connect(mapStateToProps)(Sort)} type="modal" title="Sort" />
          <Route name="nav" component={connect(mapStateToProps)(Nav)} type="modal" title="Nav" />
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
    calendar
  } = state.timesheets

  return {
    sortBy,
    startDate,
    endDate,
    period,
    isFetching,
    sortByValues,
    calendar,
    times: sort(times, sortBy)
  }
}

AppRegistry.registerComponent('PhuseActivityMonitorNative', () => PhuseActivityMonitorNative);

console.ignoredYellowBox = ['Warning: Failed propType']
