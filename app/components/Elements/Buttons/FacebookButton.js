import React from 'react';
import { connect } from 'react-redux';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
// import Platform from '../../../themes/platform';
import actions from '../../../store/actions';
import TextButton from './TextButton';

const FACEBOOK_PERMISSIONS = ['email', 'public_profile', 'user_friends'];

@connect(
  null,
  {
    ...actions,
  }
)
class FacebookButton extends React.PureComponent {
  static propTypes = {
    loginViaFacebook: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
  }

  static defaultProps = {
    style: {
      flex: 1,
    },
  }

  facebookLoginHandler = async () => {
    try {
      const { isCancelled } = await LoginManager.logInWithReadPermissions(FACEBOOK_PERMISSIONS);

      if (isCancelled === true)
        throw new Error('Xác thực tài khoản Facebook không thành công, vui lòng thử lại');

      const accessTokenData = await AccessToken.getCurrentAccessToken();

      if (accessTokenData != null) {
        const accessToken = accessTokenData.accessToken.toString();
        if (accessToken != null)
          return accessToken;
      }

      throw new Error('Không thể truy cập dữ liệu Access-token từ Facebook, \
vui lòng liên hệ vnpitch.com');
    } catch (error) { throw error; }
  }

  onConnectFacebook = async () => {
    const token = await this.facebookLoginHandler();
    this.props.loginViaFacebook({ token });
  }

  render() {
    const { style } = this.props;

    return (
      <TextButton
        onPress={() => null}
        title={'ĐĂNG NHẬP VỚI FACEBOOK'}
        wrapperStyle={style}
      />
    );
  }
}

export default FacebookButton;


