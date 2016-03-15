import React, {
  Component,
  View,
  PropTypes,
  Text,
  TouchableHighlight
} from 'react-native'
import moment from 'moment'

import { Actions } from 'react-native-router-flux'

import capitalize from '../helpers/capitalize'
import {
  setDates,
  fetchTimes
} from '../actions'

class Nav extends Component {

  setDate(modifier) {
    const { startDate, period, dispatch } = this.props
    let newDate
    switch (period) {
      case 'YEAR' :
        newDate = moment(startDate)[modifier](1, 'years')
        break
      case 'MONTH' :
        newDate = moment(startDate)[modifier](1, 'months')
        break
      case 'WEEK' :
        newDate = moment(startDate)[modifier](1, 'weeks')
        break
      case 'DAY' :
        newDate = moment(startDate)[modifier](1, 'days')
        break
      case 'CUSTOM' :
      default :
        newDate = moment(startDate)[modifier](1, 'days')
        dispatch(setPeriod('DAY'))
        break
    }
    dispatch(setDates(newDate))
    dispatch(fetchTimes())
  }

  render() {
    const {
      startDate,
      endDate,
      period,
      sortBy
    } = this.props

    const fromDate = moment(startDate)
    const toDate = moment(endDate)

    return (
      <View
        style={styles.navButtons}
        shouldRasterizeIOS={true}>

        <TouchableHighlight
          style={styles.navButtonHighlight}
          onPress={Actions.startDate}>
          <View style={styles.navButton}>
            <Text style={styles.navButtonKey}>FROM</Text>
            <Text style={styles.navButtonValue}>{fromDate.format('MMM Do')}</Text>
            <Text style={styles.navButtonKey}>{fromDate.format('YYYY')}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.navButtonHighlight}
          onPress={Actions.endDate}>
          <View style={styles.navButton}>
            <Text style={styles.navButtonKey}>TO</Text>
            <Text style={styles.navButtonValue}>{toDate.format('MMM Do')}</Text>
            <Text style={styles.navButtonKey}>{toDate.format('YYYY')}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.navButtonHighlight}
          onPress={Actions.period}>
          <View style={styles.navButton}>
            <Text style={styles.navButtonKey}>PERIOD</Text>
            <Text style={styles.navButtonValue}>{capitalize(period)}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.navButtonHighlight}
          onPress={Actions.sort}>
          <View style={styles.navButton}>
            <Text style={styles.navButtonKey}>SORT</Text>
            <Text style={styles.navButtonValue}>Order</Text>
          </View>
        </TouchableHighlight>

      </View>
    )
  }

}

export default Nav

Nav.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
}

const styles = {
  navButtons: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  navButtonHighlight: {
    flex: 1
  },
  navButton: {
    padding: 10,
    backgroundColor: 'white'
  },
  navButtonKey: {
    fontWeight: '200',
    fontSize: 10,
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  navButtonValue: {
    fontWeight: '200',
    textAlign: 'center'
  }
}
