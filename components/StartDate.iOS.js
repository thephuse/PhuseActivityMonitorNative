import React, {
  Component,
  PropTypes,
  DatePickerIOS
} from 'react-native'

import moment from 'moment'

import Modal from './Modal'

import {
  setPeriod,
  setDates,
  fetchTimes
} from '../actions'

class StartDate extends Component {

  setCustomDate(date) {
    const { dispatch } = this.props
    dispatch(setPeriod('CUSTOM'))
    dispatch(setDates(moment(date), 'start'))
    dispatch(fetchTimes())
  }

  render() {
    const {
      startDate,
      endDate
    } = this.props

    return (
      <Modal>
        <DatePickerIOS
          mode="date"
          date={moment(startDate).toDate()}
          maximumDate={moment().toDate()}
          onDateChange={this.setCustomDate.bind(this)}
        />
      </Modal>
    )
  }

}

StartDate.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default StartDate

console.ignoredYellowBox = ['Warning: Failed propType']
