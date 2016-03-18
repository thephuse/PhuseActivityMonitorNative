import React, {
  Component,
  View,
  PropTypes,
  Platform,
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

import Nav from './Nav'
import User from './User'
import NavBar from './NavBar'
import HarvestWrapper from './HarvestWrapper'
import PeriodStatistics from './PeriodStatistics'

const ios = Platform.OS === 'ios'

class Timesheets extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTimes())
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
      period,
      nav
    } = this.props

    const noResultsDay = <Text style={styles.noResults}>No times have been logged for {moment(startDate).format('MMMM Do, YYYY')}.</Text>
    const noResultsPeriod = <Text style={styles.noResults}>No times have been logged between {moment(startDate).format('MMMM Do, YYYY')} and {moment(endDate).format('MMMM Do, YYYY')}.</Text>
    const items = times.map((user, ind) => <User key={user.id} index={ind} {...user} />)

    return (
      <HarvestWrapper {...this.props}>
        <View style={styles.rootView}>
          <PeriodStatistics {...this.props} />
          {(times.length ? <User header={true} /> : null )}
          <ScrollView
            style={styles.userList}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={this.refresh.bind(this)}
                colors={['#2B8CBE']}
              />
            }>
            {(times.length ? items: isFetching === false ? period === 'DAY' ? noResultsDay: noResultsPeriod: null)}
          </ScrollView>
          <NavBar {...this.props} />
          {(nav ? <Nav {...this.props} /> : null)}
        </View>
      </HarvestWrapper>
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
  },
  absoluteButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 0
  }
}
