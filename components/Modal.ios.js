import React, {
  Component,
  PropTypes,
  View,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

const { height } = Dimensions.get('window')

class Modal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      offset: new Animated.Value(height)
    }
  }

  componentDidMount() {
    const { opacity, offset } = this.state
    Animated.parallel([
      Animated.spring(offset, { toValue: 30 })
    ]).start()
  }

  closeModal() {
    const { opacity, offset } = this.state
    const { pop } = Actions
    Animated.parallel([
      Animated.spring(offset, { toValue: height })
    ]).start(pop)
  }

  render() {
    const {
      children,
      overlayColor
    } = this.props

    const overlayColorProp = (overlayColor ? overlayColor : 'transparent')

    return (
      <View style={[ styles.modal ]}>
        <TouchableWithoutFeedback onPress={this.closeModal.bind(this)}>
          <View style={styles.outsideClick} />
        </TouchableWithoutFeedback>
        <Animated.View style={[ styles.rootView, {transform: [{translateY: this.state.offset}]} ]}>
          <View style={styles.innerView}>{children}</View>
          <Button
            style={styles.button}
            onPress={this.closeModal.bind(this)}>
            Done
          </Button>
        </Animated.View>
      </View>
    )
  }

}

export default Modal

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  outsideClick: {
    flex: 1
  },
  rootView: {
    flex: 0,
    paddingBottom: 30,
    borderTopColor: '#f6f6f6',
    borderTopWidth: 1,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  innerView: {
    borderBottomWidth: 1,
    borderBottomColor: '#f6f6f6',
  },
  button: {
    padding: 15
  }
})
