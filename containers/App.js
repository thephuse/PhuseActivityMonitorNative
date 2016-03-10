import React, {
  Component,
  View,
  PropTypes,
  Text,
  ScrollView
} from 'react-native'

import { connect } from 'react-redux'
import moment from 'moment'

import { setCookie, sortBy, setDates, fetchTimes, openCalendar } from '../actions'
import sortByValues from '../helpers/sortByValues'
import sort from '../helpers/sort'
import oAuth from '../helpers/oAuth'

import {
  oAuthUrl,
  appUrl
} from '../config'

import User from '../components/User'
// import Sort from '../components/Sort'
// import Loader from '../components/Loader'
import DateFilters from '../components/DateFilters'
import PeriodFilters from '../components/PeriodFilters'
import PeriodStatistics from '../components/PeriodStatistics'

class App extends Component {

  componentDidMount() {
    const { dispatch, times } = this.props
    const cookie = oAuth(cookie => {
      dispatch(setCookie(cookie))
      dispatch(fetchTimes())
    })
  }

  render() {
    const {
      startDate,
      endDate,
      sortByValues,
      isFetching,
      times,
      period,
      calendar
    } = this.props

    const noResultsDay = <Text>No times have been logged for {moment(startDate).format('MMMM Do, YYYY')}.</Text>
    const noResultsPeriod = <Text>No times have been logged between {moment(startDate).format('MMMM Do, YYYY')} and {moment(endDate).format('MMMM Do, YYYY')}.</Text>
    const items = times.map(user => <User key={user.id} {...user} />)

    return (
      <View>
        <DateFilters {...this.props} />
        <PeriodFilters {...this.props} />
        <PeriodStatistics times={times} />
        {times.length ?
          <ScrollView style={styles.userList}>{items}</ScrollView>
        : isFetching ?
          <Text>Loading times</Text>
        :
          period === 'DAY' ? noResultsDay : noResultsPeriod
        }
      </View>
    )
  }

}

App.propTypes = {
  startDate : PropTypes.string.isRequired,
  endDate : PropTypes.string.isRequired,
  period : PropTypes.string.isRequired,
  calendar : PropTypes.bool.isRequired,
  sortByValues : PropTypes.array.isRequired,
  sortBy : PropTypes.oneOf(sortByValues.map(i => i.value)),
  times : PropTypes.array.isRequired,
  isFetching : PropTypes.bool.isRequired,
  dispatch : PropTypes.func.isRequired
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

export default connect(mapStateToProps)(App)

const styles = {
  userList: {
    height: 300
  }
}
