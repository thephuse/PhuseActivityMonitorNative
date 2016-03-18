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
      checkingCookie: true
    }
  }

  componentDidMount() {
    this.testFetch()
  }

  // async processCookie() {
  //   const { dispatch } = this.props
  //   const cookie = await this.checkSavedCookie()
  //   const authSuccess = await this.testFetch(cookie)
  //   if (authSuccess === true) {
  //     dispatch(setCookie(cookie))
  //     dispatch(fetchTimes())
  //     this.setState({ checkingCookie: false })
  //   } else {
  //     this.setState({ checkingCookie: false })
  //   }
  // }
  //
  // async checkSavedCookie() {
  //   const date = moment()
  //   const prev = await AsyncStorage.getItem('prevDate')
  //   const cookie = await AsyncStorage.getItem('cookie')
  //   return cookie
  // }

  async testFetch(cookie) {
    const response = await fetch(serverUrl, {credentials: 'include'})
    const status = await response.status
    const canFetch = (status === 200 ? true : false)
    if (canFetch) {
      this.setState({checkingCookie: false})
    }
  }

  async checkCallbackURL(e) {
    const { dispatch } = this.props
    if (e.url && e.url.indexOf(successUrl) === 0) {
      this.setState({checkingCookie: false})
    }
  }

  // async saveCookie(cookie) {
  //   const date = moment()
  //   const prevDateSaved = await AsyncStorage.setItem('prevDate', date)
  //   const cookieSaved = await AsyncStorage.setItem('cookie', cookie)
  //   return (prevDateSaved && cookieSaved ? true : false)
  // }
  //
  // async getHarvestAuth(e) {
  //   const { dispatch } = this.props
  //   if (e.url && e.url.indexOf(successUrl) === 0 && e.loading === false) {
  //     const cookie = qs.parse(e.url.replace(`${successUrl}?`, '')).cookie
  //     const cookieSaved = await this.saveCookie(cookie)
  //     console.log({'saved cookie': cookie})
  //     dispatch(setCookie(cookie))
  //     dispatch(fetchTimes())
  //   }
  // }

  returnTrue() {
    return true
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
