import React, {
  Component,
  PropTypes,
  View,
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native'

import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

class Modal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0),
      offset: new Animated.Value(200)
    }
  }

  componentDidMount() {
    const { opacity, offset } = this.state
    Animated.timing(opacity, { duration: 250, toValue: 1 }).start()
    Animated.timing(offset, { duration: 250, toValue: 0 }).start()
  }

  closeModal() {
    const { opacity, offset } = this.state
    const { pop } = Actions
    Animated.timing(opacity, { duration: 250, toValue: 0 }).start()
    Animated.timing(offset, { duration: 250, toValue: 200 }).start(pop)
  }

  render() {
    const {
      children
    } = this.props

    return (
      <Animated.View style={[ styles.modal, {opacity: this.state.opacity} ]}>
        <Animated.View style={[ styles.rootView, {transform: [{translateY: this.state.offset}]} ]}>
          <View style={styles.innerView}>{children}</View>
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

export default Modal

const styles = StyleSheet.create({
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
    borderTopColor: '#f6f6f6',
    borderTopWidth: 1,
    backgroundColor: 'white'
  },
  innerView: {
    borderBottomWidth: 1,
    borderBottomColor: '#f6f6f6',
  },
  button: {
    padding: 15
  }
})
