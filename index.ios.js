'use strict'

import React, {
  AppRegistry,
  Component,
  StatusBar
} from 'react-native'

import {
  connect,
  Provider
} from 'react-redux'

import {
  Router,
  Scene,
  Modal,
  Actions
} from 'react-native-router-flux'

import configureStore from './store'
import Timesheets from './components/Timesheets'
import StartDate from './components/StartDate'
import EndDate from './components/EndDate'
import QRScanner from './components/QRScanner'
import PeriodFilters from './components/PeriodFilters'
import Sort from './components/Sort'
import Nav from './components/Nav'

const store = configureStore()

const mapStateToProps = function(state) {
  return state.timesheets
}

const scenes = Actions.create(
  <Scene key="modal" component={Modal}>
    <Scene key="root">
      <Scene key="timesheets" component={connect(mapStateToProps)(Timesheets)} title="Activity" initial={true} />
      <Scene key="qrScanner" component={connect(mapStateToProps)(QRScanner)} title="QR Scanner" />
    </Scene>
    <Scene key="startDate" component={connect(mapStateToProps)(StartDate)} title="Start Date" />
    <Scene key="endDate" component={connect(mapStateToProps)(EndDate)} title="End Date" />
    <Scene key="period" component={connect(mapStateToProps)(PeriodFilters)} title="Period" />
    <Scene key="sort" component={connect(mapStateToProps)(Sort)} title="Sort" />
    <Scene key="nav" component={connect(mapStateToProps)(Nav)} title="Nav" />
  </Scene>
)

class PhuseActivityMonitorNative extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router hideNavBar={true} scenes={scenes} />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('PhuseActivityMonitorNative', () => PhuseActivityMonitorNative);
