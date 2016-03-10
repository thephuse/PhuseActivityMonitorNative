import React, {
  Component,
  PropTypes,
  View,
  Text,
  Image
} from 'react-native'
import md5 from 'md5'

class User extends Component {

  render() {
    const {
      id,
      email,
      first_name,
      last_name,
      total,
      billable_total
    } = this.props

    let gravatar = `https://www.gravatar.com/avatar/${md5(email)}`

    return (
      <View style={styles.listItem}>
        <Image style={styles.avatar} src={gravatar} alt={`${first_name} ${last_name}`} />
        <Text style={[styles.inlineUserDetail, styles.name]}>{first_name} {last_name}</Text>
        <Text style={[styles.inlineUserDetail, styles.totalHours]}>{total.toFixed(2)}</Text>
        <Text style={[styles.inlineUserDetail, styles.billableHours]}>{billable_total.toFixed(2)}</Text>
        <Text style={[styles.inlineUserDetail, styles.percentage]}>{Math.round(billable_total/total*100)}%</Text>
      </View>
    )
  }

}

export default User

const styles = {
  listItem: {
    flexDirection: 'row'
  },
  inlineUserDetail: {
    flex: 1
  },
  avatarContainer: {
  },
  avatar: {
  },
  name: {
  },
  totalHours: {
  },
  billableHours: {
  },
  percentage: {
  }
}
