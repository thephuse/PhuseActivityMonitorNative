'use strict'

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native'

import qs from 'qs'

import {
  clientId,
  clientSecret,
  redirectUrl
} from './config'

let cookie

const oAuthUrl = [
  `https://phuse.harvestapp.com/oauth2/authorize`,
  `?client_id=${clientId}`,
  `&redirect_uri=${redirectUrl}`,
  `&response_type=code`
].join('')

class PhuseActivityMonitorNative extends Component {

  constructor() {
    super()
    this.state = {
      people : []
    }
  }

  componentDidMount() {
    const ctx = this
    oAuth(
      oAuthUrl,
      function() {
        fetch(`http://127.0.0.1:1234/times/2016-01-01/2016-01-31`, { headers: { cookie: cookie } })
          .then(response => response.json())
          .then(json => ctx.setState({ people : json }))
          .catch(response => console.log(response))
      }
    )
  }

  render() {
    const {
      people
    } = this.state

    console.log(people)

    return (
      <View>
        {people.map(person => <Text key={person.user.email}>{person.user.first_name} {person.user.last_name}</Text>)}
      </View>
    );
  }

}

function oAuth(oAuthUrl, done) {
  Linking.addEventListener('url', handleUrl)
  Linking.openURL(oAuthUrl)

  function handleUrl(e) {
    cookie = qs.parse(e.url.replace(`pam://auth?`, '')).cookie
    Linking.removeEventListener('url', handleUrl)
    done()
  }
}

AppRegistry.registerComponent('PhuseActivityMonitorNative', () => PhuseActivityMonitorNative);
