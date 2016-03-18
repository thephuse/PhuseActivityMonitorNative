import { Platform } from 'react-native'
import moment from 'moment'
import dateFormat from '../helpers/dateFormat'
import { serverUrl } from '../config'

export const LAYOUT = 'LAYOUT'
export const SORT_BY = 'SORT_BY'
export const SET_DATES = 'SET_DATES'
export const SET_PERIOD = 'SET_PERIOD'
export const OPEN_NAV = 'OPEN_NAV'
export const CLOSE_NAV = 'CLOSE_NAV'
export const REQUEST_TIMES = 'REQUEST_TIMES'
export const RECEIVE_TIMES = 'RECEIVE_TIMES'
export const CHECKING_COOKIE = 'CHECKING_COOKIE'
export const NOT_CHECKING_COOKIE = 'NOT_CHECKING_COOKIE'
export const VALIDATE_COOKIE = 'VALIDATE_COOKIE'
export const INVALIDATE_COOKIE = 'INVALIDATE_COOKIE'

export function layout(dimensions) {
  return {
    type: LAYOUT,
    dimensions
  }
}

export function requestTimes() {
  return {
    type: REQUEST_TIMES,
    isFetching: true
  }
}

export function receiveTimes(times) {
  return {
    type: RECEIVE_TIMES,
    times,
    isFetching: false,
    receivedAt: Date.now()
  }
}

export function sortBy(sort) {
  return {
    type: SORT_BY,
    value: sort
  }
}

export function setPeriod(period) {
  return {
    type: SET_PERIOD,
    period
  }
}

export function validateCookie() {
  return {
    type: VALIDATE_COOKIE,
    cookieValid: true
  }
}

export function invalidateCookie() {
  return {
    type: INVALIDATE_COOKIE,
    cookieValid: false
  }
}

export function openNav() {
  return {
    type: OPEN_NAV,
    nav: true
  }
}

export function closeNav() {
  return {
    type: CLOSE_NAV,
    nav: false
  }
}

export function setDates(selectedDate = new Date(), startOrEnd = 'start') {
  return (dispatch, getState) => {
    let { period, startDate, endDate } = getState().timesheets

    switch (period) {
      case 'YEAR' :
        startDate = moment(selectedDate).startOf('year').format(dateFormat)
        endDate = moment(selectedDate).startOf('year').add(1, 'year').subtract(1, 'day').format(dateFormat)
        break
      case 'MONTH' :
        startDate = moment(selectedDate).startOf('month').format(dateFormat)
        endDate = moment(selectedDate).startOf('month').add(1, 'month').subtract(1, 'day').format(dateFormat)
        break
      case 'WEEK' :
        startDate = moment(selectedDate).startOf('isoweek').format(dateFormat)
        endDate = moment(selectedDate).startOf('isoweek').add(6, 'days').format(dateFormat)
        break
      case 'DAY' :
        startDate = moment(selectedDate).format(dateFormat)
        endDate = moment(selectedDate).format(dateFormat)
        break
      case 'CUSTOM' :
      default :
        switch (startOrEnd) {
          case 'end' :
            endDate = moment(selectedDate).format(dateFormat)
            break
          case 'start' :
          default :
            startDate = moment(selectedDate).format(dateFormat)
            break
        }
        break
    }

    dispatch({
      type: SET_DATES,
      startDate,
      endDate
    })
  }
}

export function fetchTimes() {
  return (dispatch, getState) => {
    const { startDate, endDate } = getState().timesheets
    dispatch(requestTimes())
    return fetch(`${serverUrl}/times/${startDate}/${endDate}`, {credentials: 'include'})
      .then(response => response.json())
      .then(json => json.map(item => item.user).filter(item => (item.total > 0)))
      .then((times) => {
        dispatch(validateCookie())
        if (Platform.OS === 'ios') {
          setTimeout(() => { dispatch(receiveTimes(times)) }, 250)
        } else {
          dispatch(receiveTimes(times))
        }
      })
      .catch(() => dispatch(invalidateCookie()))
  }
}
