import React, {
  Component,
  PropTypes,
  View,
  DatePickerIOS
} from 'react-native'
import moment from 'moment'

import {
  setPeriod,
  setDates,
  fetchTimes
} from '../actions'

class DateFilters extends Component {

  setCustomDate(startOrEnd, date) {
    const { dispatch } = this.props
    if (date) {
      dispatch(setPeriod('CUSTOM'))
      dispatch(setDates(moment(date), startOrEnd))
      dispatch(fetchTimes())
    }
  }

  render() {
    const {
      startDate,
      endDate
    } = this.props

    return (
      <View style={styles.dateInputContainer}>

        <DatePickerIOS
          mode="date"
          date={moment(startDate).toDate()}
          maximumDate={moment(endDate).toDate()}
          onDateChange={this.setCustomDate.bind(this, 'start')}
        />

        <DatePickerIOS
          mode="date"
          date={moment(endDate).toDate()}
          minimumDate={moment(startDate).toDate()}
          maximumDate={moment().toDate()}
          onDateChange={this.setCustomDate.bind(this, 'end')}
        />

      </View>
    )
  }

}

DateFilters.propTypes = {
  startDate : PropTypes.string.isRequired,
  endDate : PropTypes.string.isRequired,
  dispatch : PropTypes.func.isRequired
}

export default DateFilters

const styles = {
  dateInputContainer : {
  },
  dateInput : {
  }
}
