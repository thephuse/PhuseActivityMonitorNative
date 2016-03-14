import React, {
  Component,
  PropTypes,
  View,
  DatePickerIOS,
  Animated,
  Dimensions
} from 'react-native'

import moment from 'moment'
import Button from 'react-native-button'
import { BlurView } from 'react-native-blur'
import { Actions } from 'react-native-router-flux'

import {
  setPeriod,
  setDates,
  fetchTimes
} from '../actions'

const { height: deviceHeight } = Dimensions.get('window')

class DateFilters extends Component {

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
      <Animated.View style={[ styles.modal, {opacity: this.state.opacity} ]}>
        <BlurView blurType="light" style={styles.modal}>
          <Animated.View style={[ styles.rootView, {transform: [{translateY: this.state.offset}]} ]}>
            <Button onPress={this.closeModal.bind(this)}>Close</Button>
            <DatePickerIOS
              mode="date"
              date={moment(startDate).toDate()}
              maximumDate={moment().toDate()}
              onDateChange={this.setCustomDate.bind(this, 'start')}
            />
            <DatePickerIOS
              mode="date"
              date={moment(endDate).toDate()}
              minimumDate={moment(startDate).toDate()}
              maximumDate={moment().toDate()}
              onDateChange={this.setCustomDate.bind(this, 'end')}
            />
          </Animated.View>
        </BlurView>
      </Animated.View>
    )
  }

}

DateFilters.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default DateFilters

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
    justifyContent: 'center'
  }
}
