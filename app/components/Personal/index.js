import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class Personal extends React.PureComponent {
  render() {
    return (
      <View style={styles.container} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  }
})