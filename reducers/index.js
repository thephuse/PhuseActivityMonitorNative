import { combineReducers } from 'redux'
import moment from 'moment'
import {
  LAYOUT,
  SET_DATES,
  SET_PERIOD,
  SORT_BY,
  OPEN_NAV,
  CLOSE_NAV,
  REQUEST_TIMES,
  RECEIVE_TIMES,
  CHECKING_COOKIE,
  NOT_CHECKING_COOKIE,
  VALIDATE_COOKIE,
  INVALIDATE_COOKIE
} from '../actions'
import sortByValues from '../helpers/sortByValues'
import periodValues from '../helpers/periodValues'
import dateFormat from '../helpers/dateFormat'

const initialState = {
  dimensions: {},
  sortBy: sortByValues[0].value,
  period: periodValues[0].value,
  isFetching: false,
  startDate: moment().format(dateFormat),
  endDate: moment().format(dateFormat),
  times: [],
  cookieValid: true
}

function timesheets(state = initialState, action) {
  switch (action.type) {
    case LAYOUT :
      return Object.assign({}, state, {
        dimensions: action.dimensions
      })
    case OPEN_NAV :
      return Object.assign({}, state, {
        nav: action.nav
      })
    case CLOSE_NAV :
      return Object.assign({}, state, {
        nav: action.nav
      })
    case SET_DATES :
      return Object.assign({}, state, {
        startDate: action.startDate,
        endDate: action.endDate
      })
    case SET_PERIOD :
      return Object.assign({}, state, {
        period: action.period
      })
    case VALIDATE_COOKIE :
      return Object.assign({}, state, {
        cookieValid: action.cookieValid
      })
    case INVALIDATE_COOKIE :
      return Object.assign({}, state, {
        cookieValid: action.cookieValid
      })
    case SORT_BY :
      return Object.assign({}, state, {
        sortBy: action.value
      })
    case REQUEST_TIMES :
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    case RECEIVE_TIMES :
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        times: action.times
      })
    default :
      return state
  }
}

const rootReducer = combineReducers({
  timesheets
})

export default rootReducer
