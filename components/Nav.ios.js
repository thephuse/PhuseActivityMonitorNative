import React, {
  Component,
  View,
  PropTypes,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native'

import moment from 'moment'

import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

import capitalize from '../helpers/capitalize'
import sortByValues from '../helpers/sortByValues'

import {
  setDates,
  fetchTimes
} from '../actions'

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offset: new Animated.Value(200),
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount() {
    const { offset, opacity } = this.state
    Animated.timing(offset, { duration: 250, toValue: 0 }).start()
    Animated.timing(opacity, { duration: 250, toValue: 1 }).start()
  }

  closeModal() {
    const { offset, opacity } = this.state
    const { pop } = Actions
    Animated.timing(offset, { duration: 250, toValue: 200 }).start()
    Animated.timing(opacity, { duration: 250, toValue: 0 }).start(pop)
  }

  render() {
    const {
      startDate,
      endDate,
      period,
      sortBy
    } = this.props

    const {
      opacity,
      offset
    } = this.state

    return (
      <Animated.View
        style={[styles.overlay, {opacity: opacity}]}
        shouldRasterizeIOS={true}>

        <TouchableHighlight
          style={styles.overlayDismissal}
          underlayColor="rgba(0,0,0,0)"
          onPress={this.closeModal.bind(this)}>
          <View />
        </TouchableHighlight>

        <Animated.View
          style={[styles.navButtons, {transform: [{translateY: offset}]}]}>

          <View style={styles.navButtonWrapper}>

            <TouchableHighlight
              style={styles.navButtonHighlight}
              underlayColor="#2B8CBE"
              onPress={Actions.startDate}>
              <View style={[styles.navButton, {borderTopWidth: 0}]}>
                <Text style={styles.navButtonKey}>From</Text>
                <Text style={styles.navButtonValue}>{moment(startDate).format('MMMM Do, YYYY')}</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.navButtonHighlight}
              underlayColor="#2B8CBE"
              onPress={Actions.endDate}>
              <View style={styles.navButton}>
                <Text style={styles.navButtonKey}>To</Text>
                <Text style={styles.navButtonValue}>{moment(endDate).format('MMMM Do, YYYY')}</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.navButtonHighlight}
              underlayColor="#2B8CBE"
              onPress={Actions.period}>
              <View style={styles.navButton}>
                <Text style={styles.navButtonKey}>Period</Text>
                <Text style={styles.navButtonValue}>{capitalize(period)}</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.navButtonHighlight}
              underlayColor="#2B8CBE"
              onPress={Actions.sort}>
              <View style={styles.navButton}>
                <Text style={styles.navButtonKey}>Sort By</Text>
                <Text style={styles.navButtonValue}>{sortByValues.filter(sb => (sortBy === sb.value))[0].title}</Text>
              </View>
            </TouchableHighlight>

          </View>

          <Button
            style={styles.button}
            onPress={this.closeModal.bind(this)}>
            Done
          </Button>

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

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  overlayDismissal: {
    flex: 1
  },
  navButtons: {
    flex: 0,
    flexDirection: 'column',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  navButtonWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef'
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
  button: {
    padding: 15
  }
})
