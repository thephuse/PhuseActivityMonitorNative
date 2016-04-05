import React, {
  Component,
  PropTypes,
  View,
  Text,
  TouchableHighlight,
  DatePickerAndroid,
  StyleSheet
} from 'react-native'

import moment from 'moment'

import {
  setPeriod,
  setDates,
  fetchTimes
} from '../actions'

class StartDate extends Component {

  async openDatepicker() {
    const { dispatch, startDate } = this.props
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: moment(startDate).toDate(),
        maxDate: moment().toDate()
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        dispatch(setPeriod('CUSTOM'))
        dispatch(setDates(moment([year, month, day]), 'start'))
        dispatch(fetchTimes())
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    const {
      startDate,
      endDate
    } = this.props

    return (
      <TouchableHighlight
        style={styles.navButtonHighlight}
        underlayColor="rgba(0,0,0,0.05)"
        onPress={this.openDatepicker.bind(this)}>
        <View style={styles.navButton}>
          <Text style={styles.navButtonText}>From: {moment(startDate).format('MMMM Do, YYYY')}</Text>
        </View>
      </TouchableHighlight>
    )
  }

}

StartDate.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
}

export default StartDate

const styles = StyleSheet.create({
  navButtonHighlight: {
    flex: 1
  },
  navButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15
  },
  navButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '300',
    textAlign: 'left',
  }
})
