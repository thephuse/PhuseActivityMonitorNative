import React, {
  Component,
  PropTypes,
  View,
  Picker,
  Animated,
  Dimensions
} from 'react-native'

import moment from 'moment'
import Button from 'react-native-button'
import { BlurView } from 'react-native-blur'
import { Actions } from 'react-native-router-flux'

import {
  setDates,
  setPeriod,
  fetchTimes,
  openCalendar
} from '../actions'

import periodValues from '../helpers/periodValues'

const { height: deviceHeight } = Dimensions.get('window')

class PeriodFilters extends Component {

  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0),
      offset: new Animated.Value(deviceHeight)
    }
  }

  componentDidMount() {
    const { opacity, offset } = this.state

    Animated.timing(opacity, {
      duration: 150,
      toValue: 1
    }).start()

    Animated.timing(offset, {
      duration: 150,
      toValue: 0
    }).start()
  }

  closeModal() {
    const { opacity, offset } = this.state
    const { dismiss } = Actions

    Animated.timing(opacity, {
      duration: 150,
      toValue: 0
    }).start(dismiss)

    Animated.timing(offset, {
      duration: 150,
      toValue: deviceHeight
    }).start(dismiss)
  }

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

    const periods = periodValues.map(periodValue => <Picker.Item key={periodValue.value} label={periodValue.title} value={periodValue.value} />)

    return (
      <Animated.View style={[ styles.modal, {opacity: this.state.opacity} ]}>
        <BlurView blurType="light" style={styles.modal}>
          <Animated.View style={[ styles.rootView, {transform: [{translateY: this.state.offset}]} ]}>
            <Picker
              style={styles.picker}
              selectedValue={period}
              onValueChange={this.setPeriod.bind(this)}
            >
              {periods}
            </Picker>
            <Button
              style={styles.button}
              onPress={this.closeModal.bind(this)}>
              Done
            </Button>
          </Animated.View>
        </BlurView>
      </Animated.View>
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

const styles = {
  modal: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  rootView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white'
  },
  button: {
    padding: 15
  },
  picker: {
    padding: 0,
    borderTopWidth: 1,
    borderTopColor: '#f6f6f6',
    borderBottomWidth: 1,
    borderBottomColor: '#f6f6f6'
  }
}
