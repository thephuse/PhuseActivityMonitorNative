import React, {
  Component,
  View,
  PropTypes,
  Text,
  Picker,
  TouchableHighlight,
  Animated,
  Dimensions
} from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import capitalize from '../helpers/capitalize'

import {
  setDates,
  fetchTimes,
  setPeriod,
  sortBy
} from '../actions'

import periodValues from '../helpers/periodValues'
import sortByValues from '../helpers/sortByValues'

const { height: deviceHeight } = Dimensions.get('window')

const periods = periodValues.map(periodValue => <Picker.Item key={periodValue.value} label={periodValue.title} value={periodValue.value} />)
const sort = sortByValues.map(sortByValue => <Picker.Item key={sortByValue.value} label={sortByValue.title} value={sortByValue.value} />)

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offset: new Animated.Value(deviceHeight),
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount() {
    const { offset, opacity } = this.state
    Animated.timing(offset, { duration: 200, toValue: 0 }).start()
    Animated.timing(opacity, { duration: 200, toValue: 1 }).start()
  }

  closeModal() {
    const { offset, opacity } = this.state
    const { dismiss } = Actions
    Animated.timing(offset, { duration: 200, toValue: deviceHeight }).start(dismiss)
    Animated.timing(opacity, { duration: 200, toValue: 0 }).start(dismiss)
  }

  setPeriod(value) {
    const { dispatch } = this.props
    dispatch(setPeriod(value))
    dispatch(setDates())
    dispatch(fetchTimes())
  }

  setSortBy(value) {
    const { dispatch } = this.props
    dispatch(sortBy(value))
  }

  render() {
    const {
      startDate,
      endDate,
      period,
      sortBy
    } = this.props

    return (
      <Animated.View
        style={[styles.overlay, {opacity: this.state.opacity}]}
        shouldRasterizeIOS={true}>

        <TouchableHighlight
          style={styles.overlayDismissal}
          underlayColor="rgba(0,0,0,0)"
          onPress={this.closeModal.bind(this)}>
          <View />
        </TouchableHighlight>

        <Animated.View
          style={[styles.navButtons, {transform: [{translateY: this.state.offset}]}]}
           elevation={2}>

          <TouchableHighlight
            style={styles.navButtonHighlight}
            underlayColor="#2B8CBE">
            <View style={[styles.navButton, {borderTopWidth: 0}]}>
              <Text style={styles.navButtonKey}>From</Text>
              <Text style={styles.navButtonValue}>{moment(startDate).format('MMMM Do, YYYY')}</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.navButtonHighlight}
            underlayColor="#2B8CBE">
            <View style={styles.navButton}>
              <Text style={styles.navButtonKey}>To</Text>
              <Text style={styles.navButtonValue}>{moment(endDate).format('MMMM Do, YYYY')}</Text>
            </View>
          </TouchableHighlight>

          <View style={styles.navButtonHighlight}>
            <View style={styles.navButton}>
              <Text style={styles.navButtonKey}>Period</Text>
              <Picker
                selectedValue={period}
                onValueChange={this.setPeriod.bind(this)}>
                {periods}
              </Picker>
            </View>
          </View>

          <View style={styles.navButtonHighlight}>
            <View style={styles.navButton}>
              <Text style={styles.navButtonKey}>Sort By</Text>
              <Picker
                selectedValue={sortBy}
                onValueChange={this.setSortBy.bind(this)}>
                {sort}
              </Picker>
            </View>
          </View>

        </Animated.View>

      </Animated.View>
    )
  }

}

export default Nav

Nav.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
}

const styles = {
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  overlayDismissal: {
    flex: 1
  },
  navButtons: {
    flex: 0,
    flexDirection: 'column',
    backgroundColor: 'white',
    shadowColor: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  navButtonHighlight: {
    flex: 1
  },
  navButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#efefef'
  },
  navButtonKey: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'left',
    flex: 0.6
  },
  navButtonValue: {
    padding: 10,
    fontWeight: '300',
    fontSize: 14,
    textAlign: 'left',
    flex: 1.4
  }
}
