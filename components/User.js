import React, {
  Component,
  PropTypes,
  View,
  Text,
  Image,
  Animated,
  TouchableHighlight
} from 'react-native'
import md5 from 'md5'
import { Actions } from 'react-native-router-flux'

class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(10)
    }
  }

  componentDidMount() {
    const { opacity, translateY } = this.state
    const { index } = this.props
    Animated.timing(opacity, { duration: 250, toValue: 1, delay: 250 + (index * 100) }).start()
    Animated.timing(translateY, { duration: 250, toValue: 0, delay: 250 + (index * 100) }).start()
  }

  render() {
    const {
      header,
      id,
      email,
      first_name,
      last_name,
      total,
      billable_total,
      index
    } = this.props

    const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`
    const percentage = Math.round(billable_total/total*100)

    return (header === true ?
      <TouchableHighlight onPress={Actions.sort}>
        <View style={[styles.listItem, styles.borderlessListItem]}>
          <View style={styles.avatarPlaceholder} />
          <Text style={[styles.inlineUserDetail, styles.name, styles.tableHeader]}>NAME</Text>
          <Text style={[styles.inlineUserDetail, styles.totalHours, styles.tableHeader]}>TOTAL</Text>
          <Text style={[styles.inlineUserDetail, styles.billableHours, styles.tableHeader]}>BILLABLE</Text>
          <View style={[styles.percentageContainer]}>
            <Text style={styles.tableHeader}>RATIO</Text>
            <View style={styles.percentageGraphicPlaceholder} />
          </View>
        </View>
      </TouchableHighlight>
    :
      <Animated.View style={[styles.listItem, {transform: [{translateY: this.state.translateY}], opacity: this.state.opacity}]}>
        <Image style={styles.avatar} source={{ uri: gravatar}} />
        <Text style={[styles.inlineUserDetail, styles.name]}>{`${first_name}\n${last_name}`}</Text>
        <Text style={[styles.inlineUserDetail, styles.totalHours]}>{total.toFixed(2)}</Text>
        <Text style={[styles.inlineUserDetail, styles.billableHours]}>{billable_total.toFixed(2)}</Text>
        <View style={styles.percentageContainer}>
          <View style={styles.percentageGraphic}>
            <View style={[styles.percentageClear, {flex: (1 - percentage/100)}]}></View>
            <View style={[styles.percentageBlob, {flex: (percentage/100)}]}></View>
            <Text style={[styles.percentage]}>{percentage}%</Text>
          </View>
        </View>
      </Animated.View>
    )
  }

}

export default User

const styles = {
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopWidth: 1,
    borderTopColor: '#f9f9f9',
    backgroundColor: 'white'
  },
  borderlessListItem: {
    borderTopWidth: 0
  },
  inlineUserDetail: {
    flex: 1,
    fontWeight: '200',
    fontSize: 14
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21
  },
  avatarPlaceholder: {
    width: 42,
    height: 1
  },
  name: {
    paddingLeft: 15,
    paddingRight: 15,
    fontWeight: '200',
    fontSize: 12
  },
  totalHours: {
  },
  billableHours: {
  },
  percentageContainer: {
    flex: 0
  },
  percentageGraphic: {
    height: 42,
    width: 42,
    flexDirection: 'column',
    borderRadius: 21,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#efefef'
  },
  percentageGraphicPlaceholder: {
    width: 42,
    height: 1
  },
  percentageClear: {
    backgroundColor: '#fff'
  },
  percentageBlob: {
    backgroundColor: '#efefef'
  },
  percentage: {
    fontWeight: '200',
    fontSize: 14,
    position: 'absolute',
    top: 11,
    left: 0,
    right: 0,
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  tableHeader: {
    fontSize: 9,
    fontWeight: '200',
    color: '#666666'
  }
}
