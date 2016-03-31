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

class EndDate extends Component {

  constructor(props) {
    super(props)
  }

  setCustomDate(date) {
    const { dispatch } = this.props
    dispatch(setPeriod('CUSTOM'))
    dispatch(setDates(moment(date), 'end'))
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
          date={moment(endDate).toDate()}
          minimumDate={moment(startDate).toDate()}
          maximumDate={moment().toDate()}
          onDateChange={this.setCustomDate.bind(this)}
        />
      </Modal>
    )
  }

}

EndDate.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default EndDate

console.ignoredYellowBox = ['Warning: Failed propType']
