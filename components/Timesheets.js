import React, {
  Component,
  View,
  PropTypes,
  Platform,
  Text,
  ScrollView,
  RefreshControl,
  StatusBar
} from 'react-native'
import moment from 'moment'

import sort from '../helpers/sort'
import { fetchTimes } from '../actions'

import User from './User'
import NavBar from './NavBar'
import LoadingText from './LoadingText'
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
      period
    } = this.props

    const timesSorted = sort(times, sortBy)
    const users = timesSorted.map((props, ind) => <User key={props.id} index={ind} {...props} />)

    return (
      <View style={styles.rootView}>
        <StatusBar
          backgroundColor="#2B8CBE"
          barStyle="light-content"
        />
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
              {(users.length ? users : <LoadingText {...this.props} />)}
            </ScrollView>
            <NavBar {...this.props} />
          </View>
        </HarvestWrapper>
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
  absoluteButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 0
  }
}
