import React, {
  Component,
  Platform,
  PropTypes,
  View,
  Picker
} from 'react-native'

import moment from 'moment'

import {
  setDates,
  setPeriod,
  fetchTimes
} from '../actions'

import Modal from './Modal'

import periodValues from '../helpers/periodValues'

const periods = periodValues.map(periodValue => <Picker.Item key={periodValue.value} label={periodValue.title} value={periodValue.value} />)

const ios = Platform.OS === 'ios'

class PeriodFilters extends Component {

  constructor(props) {
    super(props)
    this.state = {firedOnce: false}
  }

  setPeriod(value) {
    const { dispatch, period } = this.props
    const { firedOnce } = this.state
    if (!ios && period === 'DAY' && firedOnce === false) {
      this.setState({firedOnce: true})
    } else {
      dispatch(setPeriod(value))
      dispatch(setDates())
      dispatch(fetchTimes())
    }
  }

  render() {
    const {
      startDate,
      endDate,
      period
    } = this.props

    const picker = (
      <Picker
        selectedValue={period}
        onValueChange={this.setPeriod.bind(this)}>
        {periods}
      </Picker>
    )

    return (ios ? <Modal>{picker}</Modal> : picker)
  }

}

export default PeriodFilters

PeriodFilters.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}
