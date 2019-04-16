import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Platform from '../../themes/platform';

const TextInputCustom = props => {
  const {
    fontSize,
    title,
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <View style={styles.wrapTextInput}>
        <TextInput
          {...props}
          selectionColor={Platform.colorWhite}
          style={[styles.txtStyle, { fontSize }]}
          underlineColorAndroid={'transparent'}
        />
      </View>
    </View>
  );
};

TextInputCustom.propTypes = {
  fontSize: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

TextInputCustom.defaultProps = {
  fontSize: 16,
  title: '',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapTextInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Platform.colorWhite,
    paddingBottom: 19,
    paddingTop: 11,
  },
  txtStyle: {
    color: Platform.colorWhite,
  },
  titleStyle: {
    fontSize: 14,
    color: Platform.titleColor,
  },
});

export default TextInputCustom;
