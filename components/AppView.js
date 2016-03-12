import React, {
  Component,
  View,
  PropTypes,
  Text,
  ScrollView,
  RefreshControl
} from 'react-native'
import moment from 'moment'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

import PeriodStatistics from '../components/PeriodStatistics'
import oAuth from '../helpers/oAuth'
import {
  setCookie,
  fetchTimes
} from '../actions'

import User from '../components/User'

class AppView extends Component {

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
      period
    } = this.props

    const noResultsDay = <Text>No times have been logged for {moment(startDate).format('MMMM Do, YYYY')}.</Text>
    const noResultsPeriod = <Text>No times have been logged between {moment(startDate).format('MMMM Do, YYYY')} and {moment(endDate).format('MMMM Do, YYYY')}.</Text>
    const items = times.map(user => <User key={user.id} {...user} />)

    return (
      <View style={styles.rootView}>
        {/*<DateFilters {...this.props} />
        <PeriodFilters {...this.props} />*/}
        <PeriodStatistics times={times} />
        <View>
          <Button onPress={Actions.dates}>Change Dates</Button>
          <Button onPress={Actions.period}>Change Period</Button>
        </View>
        <ScrollView
          style={styles.userList}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={this.refresh.bind(this)}
              title="Loading..."
            />
          }
        >
          {(times.length ? items : isFetching === false ? period === 'DAY' ? noResultsDay : noResultsPeriod : null)}
        </ScrollView>
      </View>
    )

  }

}

export default AppView

AppView.propTypes = {
  startDate : PropTypes.string.isRequired,
  endDate : PropTypes.string.isRequired,
  period : PropTypes.string.isRequired,
  calendar : PropTypes.bool.isRequired,
  times : PropTypes.array.isRequired,
  isFetching : PropTypes.bool.isRequired
}

const styles = {
  rootView: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch'
  },
  userList: {
    flex: 1,
    backgroundColor: 'white'
  }
}
