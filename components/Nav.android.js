import React, {
  Component,
  View,
  PropTypes,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  Dimensions
} from 'react-native'

import moment from 'moment'

import capitalize from '../helpers/capitalize'

import PeriodFilters from './PeriodFilters'
import Sort from './Sort'

import { closeNav } from '../actions'

const { height: deviceHeight } = Dimensions.get('window')

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offset: new Animated.Value(deviceHeight)
    }
  }

  componentDidMount() {
    const { offset, opacity } = this.state
    Animated.timing(offset, { duration: 200, toValue: 0 }).start()
  }

  closeModal() {
    const { dispatch } = this.state
    dispatch(closeNav())
  }

  render() {
    const {
      startDate,
      endDate
    } = this.props

    const {
      offset,
      opacity
    } = this.state

    return (
      <Animated.View
        style={[styles.navButtons, {transform: [{translateY: this.state.offset}]}]}
        elevation={24}>

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
          <PeriodFilters {...this.props} style={styles.inlineFilter} />
        </View>

        <View style={styles.navButtonHighlight}>
          <Sort {...this.props} style={styles.inlineFilter} />
        </View>

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
  navButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 0,
    flexDirection: 'column',
    backgroundColor: 'white',
    shadowColor: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5
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
  },
  inlineFilter: {
    flex: 1
  }
}
