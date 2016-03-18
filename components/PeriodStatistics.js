import React, {
  Component,
  PropTypes,
  View,
  Text
} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { weekDays } from 'moment-business'
import moment from 'moment'

import { workingHours } from '../config'

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

const renderFigures = function(figure, text) {
  return (
    <View style={styles.inlinePercentageText}>
      <View style={styles.inlinePercentageTextPositioner}>
        <Text style={styles.periodStatisticValue}>{figure}</Text>
        <Text style={styles.periodStatisticKey}>{text}</Text>
      </View>
    </View>
  )
}

class PeriodStatistics extends Component {

  render() {

    const {
      times,
      startDate,
      endDate
    } = this.props

    const {
      total,
      billableTotal,
      billablePercentage
    } = getBillablePercentage(times)

    const fromDate = moment(startDate).startOf('day')
    const toDate = (moment(endDate).startOf('day').isAfter(moment().startOf('day')) ? moment().startOf('day') : moment(endDate).startOf('day'))
    const maximumHours = ((fromDate.isSame(toDate) ? workingHours : fromDate.weekDays(toDate, 'd') * workingHours) * times.length)

    return (
      <View style={styles.periodStatistics}>
        <View style={styles.periodStatisticValues}>

          <View style={styles.periodStatistic}>
            <AnimatedCircularProgress
              key="total"
              size={90}
              width={2}
              fill={(total === 0 ? 0 : Math.round(total / maximumHours * 100))}
              tintColor="#2B8CBE"
              backgroundColor="#DFDFDF"
              rotation={0}
            />
            {renderFigures(total.toFixed(1), 'TOTAL')}
          </View>

          <View style={styles.periodStatistic}>
            <AnimatedCircularProgress
              key="billableTotal"
              size={90}
              width={2}
              fill={(billableTotal === 0 ? 0 : Math.round(billableTotal / maximumHours * 100))}
              tintColor="#2B8CBE"
              backgroundColor="#DFDFDF"
              rotation={0}
            />
            {renderFigures(billableTotal.toFixed(1), 'BILLABLE')}
          </View>

          <View style={styles.periodStatistic}>
            <AnimatedCircularProgress
              key="percentage"
              size={90}
              width={2}
              fill={Math.round(billablePercentage)}
              tintColor="#2B8CBE"
              backgroundColor="#DFDFDF"
              rotation={0}
            />
            {renderFigures(`${Math.round(billablePercentage)}%`, 'RATIO')}
          </View>

        </View>

        <View style={styles.period}>
          <Text style={styles.periodValue}>
            {moment(startDate).isSame(endDate) ?
              moment(startDate).format('MMMM Do YYYY')
            :
              `${moment(startDate).format('MMMM Do YYYY')} - ${moment(endDate).format('MMMM Do YYYY')}`
            }
          </Text>
        </View>

      </View>
    )

  }

}

export default PeriodStatistics

const styles = {
  periodStatistics: {
    flex: 0,
    flexDirection: 'column',
    paddingTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef'
  },
  periodStatisticValues: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  periodStatistic: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  periodStatisticValue: {
    fontSize: 24,
    fontWeight: '200',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  periodStatisticKey: {
    fontWeight: '200',
    fontSize: 10,
    letterSpacing: 0.5,
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  inlinePercentageText: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    alignItems: 'stretch'
  },
  inlinePercentageTextPositioner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  period: {
    flex: 0
  },
  periodValue: {
    flex: 1,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 0,
    paddingTop: 10,
    fontSize: 15,
    fontWeight: '200',
    color: '#666666'
  }
}
