import React, {
  Component,
  PropTypes,
  View,
  Text,
  Platform,
  StyleSheet
} from 'react-native'
import { CircularProgress } from 'react-native-circular-progress'
import { weekDays } from 'moment-business'
import moment from 'moment'

import { workingHours } from '../config'

const ios = Platform.OS === 'ios'
const tintColor = (ios? '#2B8CBE' : '#FFFFFF')
const backgroundColor = (ios ? '#DFDFDF' : 'rgba(0,0,0,0.2)')

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

  renderFigures(figure, text) {
    const { isFetching } = this.props
    const defaultFontSize = (ios ? 18 : 25)

    return (
      <View style={styles.inlinePercentageText}>
        <View style={styles.inlinePercentageTextPositioner}>
          <Text style={[styles.periodStatisticValue, {
            fontSize : Math.min(defaultFontSize, Math.round(90 / (figure.toString().length - 1)))
          }]}>
            {isFetching ? '···' : figure}
          </Text>
          <Text style={styles.periodStatisticKey}>{text}</Text>
        </View>
      </View>
    )
  }

  render() {

    const {
      times,
      startDate,
      endDate,
      isFetching
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
            <CircularProgress
              key="total"
              size={90}
              width={2}
              fill={(total === 0 || isFetching ? 0 : Math.round(total / maximumHours * 100))}
              tintColor={tintColor}
              backgroundColor={backgroundColor}
              rotation={0}
            />
            {this.renderFigures(total.toFixed(1), 'TOTAL')}
          </View>

          <View style={styles.periodStatistic}>
            <CircularProgress
              key="billableTotal"
              size={90}
              width={2}
              fill={(billableTotal === 0 || isFetching ? 0 : Math.round(billableTotal / maximumHours * 100))}
              tintColor={tintColor}
              backgroundColor={backgroundColor}
              rotation={0}
            />
            {this.renderFigures(billableTotal.toFixed(1), 'BILLABLE')}
          </View>

          <View style={styles.periodStatistic}>
            <CircularProgress
              key="percentage"
              size={90}
              width={2}
              fill={isFetching ? 0 : Math.round(billablePercentage)}
              tintColor={tintColor}
              backgroundColor={backgroundColor}
              rotation={0}
            />
            {this.renderFigures(`${Math.round(billablePercentage)}%`, 'RATIO')}
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

const styles = StyleSheet.create({
  periodStatistics: {
    flex: 0,
    flexDirection: 'column',
    paddingTop: (ios ? 30 : 15),
    paddingBottom: (ios ? 10 : 0),
    borderBottomColor: '#efefef',
    borderBottomWidth: (ios ? 1 : 0),
    backgroundColor: (ios ? 'white' : '#2B8CBE')
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
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: (ios ? 24 : 32),
    fontWeight: (ios ? '200' : '100'),
    color: (ios ? 'black' : 'white')
  },
  periodStatisticKey: {
    fontWeight: '200',
    letterSpacing: 0.5,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: (ios ? 10 : 12),
    color: (ios ? 'black' : 'white')
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
    flex: 0,
    marginTop: (ios ? 0 : 15),
    paddingTop: (ios ? 0 : 10),
    backgroundColor: (ios ? 'transparent' : 'rgba(0,0,0,0.1)')
  },
  periodValue: {
    flex: 1,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 0,
    paddingTop: 10,
    fontWeight: '200',
    color: (ios ? '#666666' : 'white')
  }
})
