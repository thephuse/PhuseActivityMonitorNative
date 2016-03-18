import React, {
  Component,
  PropTypes,
  View,
  Picker
} from 'react-native'

import moment from 'moment'

import {
  setDates,
  setPeriod,
  fetchTimes,
  openCalendar
} from '../actions'

import Modal from './Modal'

import periodValues from '../helpers/periodValues'

const periods = periodValues.map(periodValue => <Picker.Item key={periodValue.value} label={periodValue.title} value={periodValue.value} />)

class PeriodFilters extends Component {

  setPeriod(value) {
    const { dispatch } = this.props
    dispatch(setPeriod(value))
    dispatch(setDates())
    dispatch(fetchTimes())
  }

  render() {
    const {
      startDate,
      endDate,
      period
    } = this.props

    return (
      <Modal>
        <Picker
          selectedValue={period}
          onValueChange={this.setPeriod.bind(this)}>
          {periods}
        </Picker>
      </Modal>
    )
  }

}

export default PeriodFilters

PeriodFilters.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}
