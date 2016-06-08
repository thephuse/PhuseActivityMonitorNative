import React, {
  Component,
  View,
  Platform,
  Text,
  StyleSheet
} from 'react-native'

import Camera from 'react-native-camera';

const ios = Platform.OS === 'ios'

class QRScanner extends Component {

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => { this.camera = cam }}
          style={styles.container}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

}

export default QRScanner

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})
