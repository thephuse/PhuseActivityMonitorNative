import React, {
  Component,
  View,
  PropTypes,
  Text,
  ScrollView,
  Navigator
} from 'react-native'

import {
  Router,
  Route,
  Schema,
  Animations,
  TabBar
} from 'react-native-router-flux'

import { connect } from 'react-redux'

import sort from '../helpers/sort'
import sortByValues from '../helpers/sortByValues'

import AppView from '../components/AppView'
import DateFilters from '../components/DateFilters'
// import Sort from '../components/Sort'
import PeriodFilters from '../components/PeriodFilters'

class App extends Component {

  render() {
    return (
      <Router>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} />

        <Route name="index" component={connect(mapStateToProps)(AppView)} initial={true} wrapRouter={true} title="Timesheets" />
        <Route name="dates" component={connect(mapStateToProps)(DateFilters)} wrapRouter={true} title="Dates" />
        <Route name="period" component={connect(mapStateToProps)(PeriodFilters)} wrapRouter={true} title="Period" />
      </Router>
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
    times : sort(times, sortBy)
  }
}

export default App
