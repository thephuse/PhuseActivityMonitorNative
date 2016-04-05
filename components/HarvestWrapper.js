import React, {
  Component,
  View,
  Text,
  WebView,
  StyleSheet
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

  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingPositioner}>
          <Text style={styles.loadingText}>Signing Into Harvest</Text>
        </View>
      </View>
    )
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
        renderLoading={this.renderLoadingView}
        automaticallyAdjustContentInsets={true}
      />
    )

    return (cookieValid ? children : login)
  }

}

export default HarvestWrapper

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingPositioner: {},
  loadingText: {
    textAlign: 'center'
  }
})
