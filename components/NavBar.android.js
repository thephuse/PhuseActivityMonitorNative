import React, {
  Component,
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import moment from 'moment'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

import {
  setDates,
  fetchTimes,
  openNav,
  closeNav
} from '../actions'

class NavBar extends Component {

  openNav() {
    const { dispatch } = this.props
    dispatch(openNav())
  }

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
      <View
        style={styles.navBar}
        elevation={15}>

        <Button
          containerStyle={styles.navButtonContainer}
          style={styles.navButton}
          onPress={this.setDate.bind(this, 'subtract')}>
            Earlier
        </Button>

        <Button
          containerStyle={styles.navButtonContainer}
          style={styles.navButton}
          onPress={this.openNav.bind(this)}>
            Change Dates
        </Button>

        <Button
          containerStyle={styles.navButtonContainer}
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

const styles = {
  navBar: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: '#2B8CBE'
  },
  navButtonContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  navButton: {
    color: 'white',
    fontWeight: '200',
    fontSize: 19
  }
}
