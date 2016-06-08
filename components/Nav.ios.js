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
import Modal from './Modal'

import capitalize from '../helpers/capitalize'
import sortByValues from '../helpers/sortByValues'

import {
  setDates,
  fetchTimes
} from '../actions'

const overlayColor = 'rgba(0,0,0,0.2)'

class Nav extends Component {

  render() {
    const {
      startDate,
      endDate,
      period,
      sortBy
    } = this.props

    return (
      <Modal overlayColor={overlayColor}>

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

          <TouchableHighlight
            style={styles.navButtonHighlight}
            underlayColor="#2B8CBE"
            onPress={Actions.qrScanner}>
            <View style={styles.navButton}>
              <Text style={styles.navButtonKey}>Scan QR Code</Text>
            </View>
          </TouchableHighlight>

        </View>

      </Modal>
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
  navButtonWrapper: {
    paddingLeft: 10,
    paddingRight: 10
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
})
