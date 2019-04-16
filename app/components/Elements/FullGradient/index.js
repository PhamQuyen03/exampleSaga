import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

const FullGradient = props => {
  const { style, opacity, children } = props;

  return (
    <LinearGradient
      colors={
        [`rgba(180, 236, 81, ${opacity})`, `rgba(66, 147, 33, ${opacity})`]
      }
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

FullGradient.propTypes = {
  children: PropTypes.element.isRequired,
  opacity: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
};

FullGradient.defaultProps = {
  style: {
    flex: 1,
    opacity: 1,
  },
};

export default FullGradient;
