import React, {
  Component,
  View,
  Platform,
  Text,
  StyleSheet
} from 'react-native'

const ios = Platform.OS === 'ios'

class UserHeaders extends Component {
  render() {
    return (
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
    )
  }
}

export default UserHeaders

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
  avatarPlaceholder: {
    width: 42,
    height: 1
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
  percentageGraphicPlaceholder: {
    width: 42,
    height: 1
  },
  tableHeader: {
    fontSize: (ios ? 9 : 12),
    fontWeight: '200',
    color: '#666666'
  }
})
