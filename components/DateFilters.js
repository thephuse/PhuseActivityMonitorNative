import React, {
  Component,
  PropTypes,
  View,
  DatePickerIOS
} from 'react-native'
import moment from 'moment'

class DateFilters extends Component {

  setCustomDate(startOrEnd, event) {
    const { dispatch } = this.props
    console.log(startOrEnd, event)
    // if (value) {
    //   dispatch(setPeriod('CUSTOM'))
    //   dispatch(setDates(moment(event.target.value), startOrEnd))
    //   dispatch(fetchTimes())
    // }
  }

  render() {
    const {
      startDate,
      endDate
    } = this.props

    return (
      <View style={styles.dateInputContainer}>
      
        <DatePickerIOS
          style={styles.dateInput}
          date={moment(startDate).toDate()}
          maximumDate={moment(endDate).toDate()}
          onDateChange={this.setCustomDate.bind(this, 'start')} />

        <DatePickerIOS
          style={styles.dateInput}
          date={moment(endDate).toDate()}
          minimumDate={moment(startDate).toDate()}
          maximumDate={moment().toDate()}
          onDateChange={this.setCustomDate.bind(this, 'end')} />

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
