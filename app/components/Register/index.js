import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import images from '../../themes/assets/images';

class Register extends React.PureComponent {
  render() {
    return(
      <ImageBackground
        source={images.backgroundLogin}
        style={styles.container}
      >

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});

export default Register;
