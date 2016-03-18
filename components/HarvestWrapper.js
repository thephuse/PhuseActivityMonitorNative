import React, {
  Component,
  WebView,
  AsyncStorage,
  Text
} from 'react-native'

import moment from 'moment'
import qs from 'qs'

import {
  oAuthUrl,
  clientId,
  redirectUrl,
  appUrl,
  serverUrl,
  successUrl,
  maxAge
} from '../config'

import {
  fetchTimes
} from '../actions'

class HarvestWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      checkingCookie: true,
      cookieValid: false
    }
  }

  componentDidMount() {
    this.testFetch()
  }

  returnTrue() {
    return true
  }

  async testFetch(cookie) {
    const response = await fetch(serverUrl, {credentials: 'include'})
    const status = await response.status
    const canFetch = (status === 200 ? true : false)
    if (canFetch) {
      this.setState({
        checkingCookie: false,
        cookieValid: true
      })
    }
  }

  async checkCallbackURL(e) {
    const { dispatch } = this.props
    if (e.url && e.url.indexOf(successUrl) === 0) {
      this.setState({
        checkingCookie: false,
        cookieValid: true
      })
    }
  }

  render() {
    const {
      children
    } = this.props

    const {
      checkingCookie
    } = this.state

    return (
      checkingCookie ?
        <WebView
          bounces={false}
          source={{ uri: oAuthUrl }}
          startInLoadingState={true}
          onNavigationStateChange={this.checkCallbackURL.bind(this)}
          onShouldStartLoadWithRequest={this.returnTrue}
          javaScriptEnabled={true}
        />
      :
        children
    )
  }

}

export default HarvestWrapper
