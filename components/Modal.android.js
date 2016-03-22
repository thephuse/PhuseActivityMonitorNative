import React, {
  Component,
  PropTypes,
  View,
  Animated,
  Dimensions
} from 'react-native'

import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

const { height: deviceHeight } = Dimensions.get('window')

class Modal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0),
      offset: new Animated.Value(deviceHeight)
    }
  }

  componentDidMount() {
    const { opacity, offset } = this.state
    Animated.timing(opacity, { duration: 200, toValue: 1 }).start()
    Animated.timing(offset, { duration: 200, toValue: 0 }).start()
  }

  closeModal() {
    const { opacity, offset } = this.state
    const { dismiss } = Actions
    Animated.timing(opacity, { duration: 200, toValue: 0 }).start(dismiss)
    Animated.timing(offset, { duration: 200, toValue: deviceHeight }).start(dismiss)
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
