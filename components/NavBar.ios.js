import React, {
  Component,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import moment from 'moment'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

import {
  setDates,
  fetchTimes
} from '../actions'

class NavBar extends Component {

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
      endDate
    } = this.props

    return (
      <View style={styles.navBar}>

        <Button
          style={styles.navButton}
          onPress={this.setDate.bind(this, 'subtract')}>
            Earlier
        </Button>

        <Button
          style={styles.navButton}
          onPress={Actions.nav}>
            More Options
        </Button>

        <Button
          style={styles.navButton}
          disabled={!(moment(startDate).isBefore(moment().startOf('day')))}
          onPress={this.setDate.bind(this, 'add')}>
            Later
        </Button>

      </View>
    )
  }

}

export default NavBar

const styles = StyleSheet.create({
  navBar: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  navButton: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 15
  }
})
