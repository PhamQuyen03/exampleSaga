import React from 'react';
import {
  View,
  Text,
  ViewPropTypes,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Platform from '../../../themes/platform';

const TextButton = props => {
  const {
    borderRadius,
    backgroundColor,
    wrapperStyle,
    title,
    onPress,
    isLoading,
  } = props;

  const contentButton = isLoading ?
    (
      <ActivityIndicator
        color={Platform.colorWhite}
        size={'small'}
      />
    ) : (
      <Text style={styles.textStyle}>
        {title}
      </Text>
    );

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={wrapperStyle}
    >
      <View
        style={[
          {
            backgroundColor,
            borderRadius,
          },
          styles.container,
        ]}
      >
        {contentButton}
      </View>
    </TouchableOpacity>
  );
};

TextButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  borderRadius: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  wrapperStyle: ViewPropTypes.style,
};

TextButton.defaultProps = {
  wrapperStyle: {
    width: '100%',
  },
  isLoading: false,
  borderRadius: 50,
  backgroundColor: 'transparent',
  onPress: null,
  title: '',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: Platform.fontSizeTextButton,
    color: Platform.colorWhite,
  },
});

export default TextButton;
