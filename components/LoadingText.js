import React, {
  Component,
  PropTypes,
  View,
  Text,
  Animated
} from 'react-native'

import moment from 'moment'

class LoadingText extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount() {
    const { scale, opacity } = this.state
    Animated.timing(scale, { duration: 200, toValue: 1 }).start()
    Animated.timing(opacity, { duration: 200, toValue: 1 }).start()
  }

  render() {
    const {
      isFetching,
      period,
      startDate,
      endDate
    } = this.props

    const {
      opacity,
      scale
    } = this.state

    const notice = (
      isFetching ? 'Fetching Times'
      : period === 'DAY' ? `No times have been logged for ${moment(startDate).format('MMMM Do, YYYY')}.`
      : `No times have been logged between ${moment(startDate).format('MMMM Do, YYYY')} and ${moment(endDate).format('MMMM Do, YYYY')}.`
    )


    return (
      <View style={styles.container}>
        <Animated.View style={{opacity: opacity, transform:[{scale: scale}]}}>
          <Text style={styles.innerText}>{notice}</Text>
        </Animated.View>
      </View>
    )
  }

}

export default LoadingText

LoadingText.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired
}

const styles = {
  container: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 80
  },
  innerText: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '200',
    textAlign: 'center'
  }
}
