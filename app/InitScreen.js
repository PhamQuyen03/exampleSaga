import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { startApp, rootNavigatorApp } from './navigation';

export default class InitScreen extends React.PureComponent {
  async componentDidMount() {
    try {
      // if (user) {
      startApp();
      // } else {
      //   goToAuth()
      // }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{'Loading'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
