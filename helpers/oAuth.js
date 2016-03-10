import { Linking, AsyncStorage } from 'react-native'
import moment from 'moment'
import qs from 'qs'

import {
  oAuthUrl,
  appUrl,
  serverUrl,
  maxAge
} from '../config'

export default function oAuth(callback) {

  const handleAuthUrl = handleUrl(callback)

  const handleFailure = function() {
    Linking.addEventListener('url', handleAuthUrl)
    Linking.openURL(oAuthUrl)
  }

  const handleSuccess = function(cookie) {
    return fetch(serverUrl, { headers: { cookie: cookie } })
      .then(response => (response.status === 403) ? handleFailure() : callback(cookie))
  }

  return checkCookie({
    success : handleSuccess,
    failure : handleFailure
  })
}

async function checkCookie({ success, failure }) {
  const date = moment()
  const prevDate = await AsyncStorage.getItem('prevDate')
  const cookie = await AsyncStorage.getItem('cookie')
  if (cookie !== null && prevDate !== null && date.diff(prevDate) <= maxAge) {
    return success(cookie)
  } else {
    return failure()
  }
}

async function saveCookie(cookie, callback) {
  const date = moment()
  await AsyncStorage.setItem('prevDate', date)
  await AsyncStorage.setItem('cookie', cookie)
  return callback(cookie)
}

function handleUrl(callback) {
  return function(e) {
    const cookie = qs.parse(e.url.replace(`${appUrl}?`, '')).cookie
    Linking.removeEventListener('url', handleUrl)
    return saveCookie(cookie, callback)
  }
}
