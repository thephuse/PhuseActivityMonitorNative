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

import periodValues from '../helpers/periodValues'

class PeriodFilters extends Component {

  openCalendar() {
    const { dispatch } = this.props
    dispatch(openCalendar())
  }

  setPeriod(value) {
    const { dispatch } = this.props
    dispatch(setPeriod(value))
    dispatch(setDates())
    dispatch(fetchTimes())
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
      endDate,
      period
    } = this.props

    return (
      <View>
        <Picker
          selectedValue={period}
          onValueChange={this.setPeriod.bind(this)}>
          {periodValues.map(periodValue => {
            return (
              <Picker.Item key={periodValue.value} label={periodValue.title} value={periodValue.value} />
            )
          })}
        </Picker>
      </View>
    )
  }

}

export default PeriodFilters

PeriodFilters.propTypes = {
  startDate : PropTypes.string.isRequired,
  endDate : PropTypes.string.isRequired,
  period : PropTypes.string.isRequired,
  dispatch : PropTypes.func.isRequired
}
