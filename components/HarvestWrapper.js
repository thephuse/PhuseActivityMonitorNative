import React, {
  Component,
  WebView,
  AsyncStorage,
  Text
} from 'react-native'

import moment from 'moment'

import {
  oAuthUrl,
  serverUrl,
  successUrl
} from '../config'

import {
  validateCookie,
  fetchTimes
} from '../actions'

class HarvestWrapper extends Component {

  async checkCallbackURL(e) {
    const { dispatch } = this.props
    if (e.url && e.url.indexOf(successUrl) === 0) {
      dispatch(validateCookie())
      dispatch(fetchTimes())
    }
  }

  render() {
    const {
      children,
      cookieValid
    } = this.props

    const login = (
      <WebView
        bounces={false}
        source={{ uri: oAuthUrl }}
        startInLoadingState={true}
        onNavigationStateChange={this.checkCallbackURL.bind(this)}
        onShouldStartLoadWithRequest={()=> true}
        javaScriptEnabled={true}
      />
    )

    return (cookieValid ? children : login)
  }

}

export default HarvestWrapper
