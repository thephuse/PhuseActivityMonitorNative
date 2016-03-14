import React, {
  Platform,
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

import Timesheets from '../components/Timesheets'
import DateFiltersIOS from '../components/DateFilters.iOS'
// import Sort from '../components/Sort'
import PeriodFilters from '../components/PeriodFilters'

class Routes extends Component {

  render() {
    return (
      <Router hideNavBar={true}>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} />

        <Route name="index" component={connect(mapStateToProps)(Timesheets)} initial={true} title="Timesheets" />
        {Platform.OS === 'ios' ?
          <Route name="dates" component={connect(mapStateToProps)(DateFiltersIOS)} type="modal" title="Dates" />
       : null}
        <Route name="period" component={connect(mapStateToProps)(PeriodFilters)} type="modal" title="Period" />
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
    times: sort(times, sortBy)
  }
}

export default Routes
