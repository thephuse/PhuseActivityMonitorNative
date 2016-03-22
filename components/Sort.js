import React, {
  Component,
  Platform,
  PropTypes,
  View,
  Picker
} from 'react-native'

import Modal from './Modal'

import { sortBy } from '../actions'
import sortByValues from '../helpers/sortByValues'

const sort = sortByValues.map(sortByValue => <Picker.Item key={sortByValue.value} label={sortByValue.title} value={sortByValue.value} />)

const ios = Platform.OS === 'ios'

class Sort extends Component {

  constructor(props) {
    super(props)
    this.state = {firedOnce: false}
  }

  setSortBy(value) {
    const { dispatch } = this.props
    const { firedOnce } = this.state
    if (!ios && firedOnce === false) {
      this.setState({firedOnce: true})
    } else {
      dispatch(sortBy(value))
    }
  }

  render() {
    const {
      sortBy
    } = this.props

    const picker = (
      <Picker
        selectedValue={sortBy}
        onValueChange={this.setSortBy.bind(this)}>
        {sort}
      </Picker>
    )

    return (ios ? <Modal>{picker}</Modal> : picker)
  }

}

export default Sort

Sort.propTypes = {
  sortBy: PropTypes.oneOf(sortByValues.map(i => i.value)),
  dispatch: PropTypes.func.isRequired
}
