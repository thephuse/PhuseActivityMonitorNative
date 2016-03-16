import React, {
  Component,
  View,
  PropTypes,
  Text,
  ScrollView,
  RefreshControl
} from 'react-native'
import moment from 'moment'

import oAuth from '../helpers/oAuth'
import {
  setCookie,
  fetchTimes
} from '../actions'

import Nav from '../components/Nav'
import User from '../components/User'
import PeriodStatistics from './PeriodStatistics'

class Timesheets extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    oAuth(cookie => {
      dispatch(setCookie(cookie))
      dispatch(fetchTimes())
    })
  }

  refresh() {
    const { dispatch } = this.props
    dispatch(fetchTimes())
  }

  render() {

    const {
      startDate,
      endDate,
      sortByValues,
      isFetching,
      times,
      sortBy,
      period
    } = this.props

    const noResultsDay = <Text style={styles.noResults}>No times have been logged for {moment(startDate).format('MMMM Do, YYYY')}.</Text>
    const noResultsPeriod = <Text style={styles.noResults}>No times have been logged between {moment(startDate).format('MMMM Do, YYYY')} and {moment(endDate).format('MMMM Do, YYYY')}.</Text>
    const items = times.map((user, ind) => <User key={user.id} index={ind} {...user} />)

    return (
      <View style={styles.rootView}>
        <PeriodStatistics {...this.props} />
        <ScrollView
          style={styles.userList}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={this.refresh.bind(this)}
            />
          }>
          {(times.length ? <User header={true} /> : null )}
          {(times.length ? items: isFetching === false ? period === 'DAY' ? noResultsDay: noResultsPeriod: null)}
        </ScrollView>
        <Nav {...this.props} />
      </View>
    )

  }

}

export default Timesheets

Timesheets.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  times: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

const styles = {
  rootView: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: 'white'
  },
  userList: {
    flex: 1,
    backgroundColor: 'white'
  },
  noResults: {
    padding: 20,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '200',
    textAlign: 'center'
  }
}
