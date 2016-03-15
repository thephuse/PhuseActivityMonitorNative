import React, {
  Component,
  PropTypes,
  View,
  Picker
} from 'react-native'

import Modal from './Modal'

import { sortBy } from '../actions'
import sortByValues from '../helpers/sortByValues'

class Sort extends Component {

  setSortBy(value) {
    const { dispatch } = this.props
    dispatch(sortBy(value))
  }

  render() {
    const {
      sortBy
    } = this.props

    const sort = sortByValues.map(sortByValue => <Picker.Item key={sortByValue.value} label={sortByValue.title} value={sortByValue.value} />)

    return (
      <Modal>
        <Picker
          selectedValue={sortBy}
          onValueChange={this.setSortBy.bind(this)}>
          {sort}
        </Picker>
      </Modal>
    )
  }

}

export default Sort

Sort.propTypes = {
  sortBy: PropTypes.oneOf(sortByValues.map(i => i.value)),
  dispatch: PropTypes.func.isRequired
}
