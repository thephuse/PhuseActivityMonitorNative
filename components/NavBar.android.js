import React, {
  Component,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import moment from 'moment'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux'

import {
  setDates,
  setPeriod,
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

    const cannotGoLater = (!(moment(startDate).isBefore(moment().startOf('day'))) || moment(endDate).isAfter(moment().endOf('day')))

    return (
      <View style={styles.navBar}>

        <Button
          containerStyle={styles.navButtonContainer}
          style={styles.navButton}
          onPress={this.setDate.bind(this, 'subtract')}>
            <Icon name="skip-previous" size={24} color="#FFF" />
        </Button>

        <Button
          containerStyle={styles.navButtonContainer}
          style={styles.navButton}
          onPress={Actions.nav}>
            <Icon name="date-range" size={24} color="#FFF" />
        </Button>

        <Button
          containerStyle={styles.navButtonContainer}
          style={[styles.navButton, (cannotGoLater ? styles.disabled : {})]}
          disabled={cannotGoLater}
          onPress={this.setDate.bind(this, 'add')}>
            <Icon name="skip-next" size={24} color="#FFF" />
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
    fontSize: 17
  },
  disabled: {
    opacity: 0.3
  }
})
