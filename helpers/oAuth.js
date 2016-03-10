import { Linking, AsyncStorage } from 'react-native'
import qs from 'qs'

export default function oAuth(oAuthUrl, appUrl, callback) {
  Linking.addEventListener('url', handleUrl)
  Linking.openURL(oAuthUrl)

  function handleUrl(e) {
    cookie = qs.parse(e.url.replace(`${appUrl}?`, '')).cookie
    Linking.removeEventListener('url', handleUrl)
    return callback(cookie)
  }
}
