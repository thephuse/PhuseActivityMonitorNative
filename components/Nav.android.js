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
import { Actions } from 'react-native-router-flux'
import capitalize from '../helpers/capitalize'

import StartDate from './StartDate'
import EndDate from './EndDate'
import PeriodFilters from './PeriodFilters'
import Sort from './Sort'

const { height: deviceHeight } = Dimensions.get('window')

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offset: new Animated.Value(150),
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount() {
    const { offset, opacity } = this.state
    Animated.timing(offset, { duration: 220, toValue: 0 }).start()
    Animated.timing(opacity, { duration: 220, toValue: 1 }).start()
  }

  closeModal() {
    const { offset, opacity } = this.state
    const { dismiss } = Actions
    Animated.timing(offset, { duration: 220, toValue: 150 }).start(dismiss)
    Animated.timing(opacity, { duration: 220, toValue: 0 }).start(dismiss)
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
      <Animated.View style={[styles.overlay, {opacity: opacity}]}>

        <TouchableHighlight
          style={styles.overlayDismissal}
          underlayColor="rgba(0,0,0,0)"
          onPress={this.closeModal.bind(this)}>
          <View />
        </TouchableHighlight>

        <Animated.View style={[styles.navButtons, {transform: [{translateY: offset}]}]}>

          <StartDate {...this.props} />

          <EndDate {...this.props} />

          <View style={styles.navButtonHighlight}>
            <PeriodFilters {...this.props} style={styles.inlineFilter} />
          </View>

          <View style={styles.navButtonHighlight}>
            <Sort {...this.props} style={styles.inlineFilter} />
          </View>

        </Animated.View>

      </Animated.View>
    )
  }

}

export default Nav

Nav.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
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
  }
}
