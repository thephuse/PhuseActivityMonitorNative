import React, {
  Component,
  PropTypes,
  Platform,
  View,
  Text,
  Image,
  Animated,
  TouchableHighlight,
  StyleSheet,
  LayoutAnimation,
  InteractionManager
} from 'react-native'

import md5 from 'md5'
import LinearGradient from 'react-native-linear-gradient'

import { Actions } from 'react-native-router-flux'

const ios = Platform.OS === 'ios'

class User extends Component {

  componentDidMount() {
    LayoutAnimation.spring()
  }

  componentWillUnmount() {
    LayoutAnimation.easeInEaseOut()
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
    const percentage = (billable_total/total).toFixed(2)

    return (
      <View style={[styles.listItem]}>
        <Image style={styles.avatar} source={{ uri: gravatar}} />
        <Text style={[styles.inlineUserDetail, styles.name]}>{`${first_name}\n${last_name}`}</Text>
        <Text style={[styles.inlineUserDetail, styles.totalHours]}>{total.toFixed(2)}</Text>
        <Text style={[styles.inlineUserDetail, styles.billableHours]}>{billable_total.toFixed(2)}</Text>
        <View style={styles.percentageContainer}>
          <LinearGradient
            style={styles.percentageGraphic}
            locations={[0, (1-percentage), (1-percentage), 1]}
            colors={['#FFF', '#FFF', '#EFEFEF', '#EFEFEF']}>
            <Text style={[styles.percentage]}>{(percentage * 100).toFixed(0)}%</Text>
          </LinearGradient>
        </View>
      </View>
    )
  }

}

export default User

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: (ios ? 8 : 10),
    paddingBottom: (ios ? 8 : 10),
    paddingLeft: (ios ? 15 : 0),
    paddingRight: (ios ? 15 : 0),
    marginLeft: (ios ? 0 : 15),
    marginRight: (ios ? 0 : 15),
    borderTopWidth: (ios ? 1 : 0),
    borderTopColor: '#f9f9f9',
    backgroundColor: 'white'
  },
  borderlessListItem: {
    borderTopWidth: 0,
    backgroundColor: (ios ? 'white' : '#F9F9F9'),
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 0,
    marginRight: 0
  },
  inlineUserDetail: {
    flex: 1,
    fontWeight: '200',
    fontSize: (ios ? 14 : 16)
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21
  },
  name: {
    paddingLeft: (ios ? 15 : 0),
    paddingRight: 15,
    marginLeft: (ios ? 0 : 15),
    fontWeight: (ios ? '200' : '500'),
    fontSize: (ios ? 12 : 15)
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
  percentage: {
    fontWeight: '200',
    fontSize: (ios ? 14 : 16),
    position: 'absolute',
    top: (ios ? 11 : 9),
    left: 0,
    right: 0,
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
})
