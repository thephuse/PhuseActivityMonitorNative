import { Linking, AsyncStorage } from 'react-native'
import moment from 'moment'
import qs from 'qs'

import {
  oAuthUrl,
  appUrl,
  serverUrl,
  maxAge
} from '../config'

export default function oAuth(done) {
  return checkCookie()
    .then(testFetch({ done }))
    .catch(() => openOauthUrl({ done }))
}

const openOauthUrl = function({ done }) {
  Linking.addEventListener('url', handleUrl({ done }))
  Linking.openURL(oAuthUrl)
}

const testFetch = function({ done }) {
  return function({ cookie }) {
    return fetch(serverUrl, { headers: { cookie: cookie } })
      .then(response => {
        if (response.ok && response.status === 200) {
          return done(cookie)
        } else {
          return openOauthUrl({ done })
        }
      })
  }
}

const checkCookie = function() {
  return new Promise(function(resolve, reject) {
    const date = moment()
    let prev
    AsyncStorage.getItem('prevDate')
      .then(value => {
        prev = value
        return AsyncStorage.getItem('cookie')
      })
      .then(cookie => {
        if (cookie !== null && prev !== null && date.diff(prev) <= maxAge) {
          return resolve({ cookie })
        } else {
          return reject()
        }
      })
  })
}

const saveCookie = function({ cookie }) {
  return new Promise(function(resolve, reject) {
    const date = moment()
    AsyncStorage.setItem('prevDate', date)
      .then(value => {
        return AsyncStorage.setItem('cookie', cookie)
      })
      .then(() => {
        return resolve(cookie)
      })
      .catch(error => {
        return reject(error)
      })
  })
}

function handleUrl({ done }) {
  return function(e) {
    const cookie = qs.parse(e.url.replace(`${appUrl}?`, '')).cookie
    Linking.removeEventListener('url', handleUrl)
    return saveCookie({ cookie: cookie })
      .then(() => { done(cookie) })
  }
}
