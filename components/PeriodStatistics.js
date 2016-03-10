import React, {
  Component,
  PropTypes,
  View,
  Text
} from 'react-native'

const getBillablePercentage = function(timesheets) {
    let total = 0
    let billableTotal = 0
    let billablePercentage = 0
    if (timesheets && timesheets.length) {
      total = timesheets.map(timesheet => timesheet.total).reduce((prev, curr) => { return prev + curr })
      billableTotal = timesheets.map(timesheet => timesheet.billable_total).reduce((prev, curr) => { return prev + curr })
      billablePercentage = (billableTotal / total * 100)
    }
    return {
      total,
      billableTotal,
      billablePercentage
    }
  }

class PeriodStatistics extends Component {

  render() {

    const { times } = this.props

    const {
      total,
      billableTotal,
      billablePercentage
    } = getBillablePercentage(times)

    return (
      <View style={styles.periodStatistics}>

        <View style={styles.periodStatistic}>
          <View style={styles.periodStatisticContainer}>
            <Text style={styles.periodStatisticValue}>{total.toFixed(1)}</Text>
            <Text style={styles.periodStatisticKey}>total</Text>
          </View>
        </View>

        <View style={styles.periodStatistic}>
          <View style={styles.periodStatisticContainer}>
            <Text style={styles.periodStatisticValue}>{billableTotal.toFixed(1)}</Text>
            <Text style={styles.periodStatisticKey}>billable</Text>
          </View>
        </View>

        <View style={styles.periodStatistic}>
          <View style={styles.periodStatisticContainer}>
            <Text style={styles.periodStatisticValue}>{Math.round(billablePercentage)}%</Text>
            <Text style={styles.periodStatisticKey}>ratio</Text>
          </View>
        </View>

      </View>
    )

  }

}

export default PeriodStatistics

const styles = {
  periodStatistics: {
    flexDirection: 'row'
  },
  periodStatisticContainer: {
    flex: 1
  },
  periodStatistic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#efefef'
  },
  periodStatisticValue: {
  },
  periodStatisticKey: {
  }
}
