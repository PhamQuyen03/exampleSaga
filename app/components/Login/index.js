import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import FullGradient from '../Elements/FullGradient';
import FacebookButton from '../Elements/Buttons/FacebookButton';
import TextButton from '../Elements/Buttons/TextButton';
import TextInputCustom from '../Elements/TextInput';
import Platform from '../../themes/platform';
import actions from '../../store/actions';
import images from '../../themes/assets/images';
import icons from '../../themes/assets/icons';
import { rootNavigatorApp } from '../../navigation';

// function mapStateToProps(state, ownProps) {
//   return {
//     news: state.news,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(newsActions, dispatch)
//   };
// }
@connect(
  null,
  {
    ...actions,
  }
)
class Login extends React.PureComponent {
  static propTypes = {
    componentId: PropTypes.string.isRequired,
    getArticle: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: 'vuhoangha100995@gmail.com',
      password: '123',
      dataArticles: [],
    };
  }

  componentDidMount() {
    this.props.getArticle({ name: 'quyen', age: 22 }, (result, errors) => {
      if (result) this.setState({ dataArticles: result });
      console.log('result.result', result);
      console.log('errors.errors', errors);
    });
  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log('#####nextProps', nextProps);
  //   console.log('#####nextState', nextState);
  // }

  onLogin = () => {
    const { email, password } = this.state;

    this.props.login({
      email,
      password,
    }, (err, data) => {
      if (data) {
        rootNavigatorApp();
      }
    });
  }

  onNavigateToRegister = () => {
    const { componentId } = this.props;

    Navigation.push(componentId, {
      component: {
        name: 'Register',
        passProps: {
        },
        options: {
          topBar: {
            backButton: {
              color: Platform.colorWhite,
            },
            elevation: 0,
            noBorder: true,
            drawBehind: true,
            background: {
              color: 'transparent',
            },
            title: {
              text: 'Xác nhận',
              color: Platform.colorWhite,
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <SafeAreaView>
        <ImageBackground
          source={images.backgroundLogin}
          style={styles.backgroundStyle}
        >
          <ScrollView
            contentContainerStyle={styles.container}
          >
            <View style={styles.wrapBallIcon}>
              <Image
                source={icons.ball}
                style={styles.ballStyle}
              />
              <Text style={styles.txtVnpitch}>{'Vnpitch'}</Text>
            </View>
            <View style={styles.wrapFormInput}>
              <TextInputCustom
                onChangeText={text => this.setState({ email: text })}
                title={'Tài khoản'}
              />
              <View style={styles.spaceBetweenTextInput} />
              <TextInputCustom
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry
                title={'Mật khẩu'}
              />
              <View style={styles.wrapRegisterBtn}>
                <TouchableOpacity onPress={this.onNavigateToRegister}>
                  <Text style={styles.txtRegisterBtn}>
                    {'Đăng ký / Quên mật khẩu'}
                  </Text>
                </TouchableOpacity>
              </View>
              <TextButton
                backgroundColor={Platform.backgroundLoginButton}
                onPress={this.onLogin}
                title={'ĐĂNG NHẬP'}
              />
            </View>
            <View style={styles.wrapLoginDifType}>
              <View style={styles.wrapSpaceDifLogin}>
                <Text style={styles.txtSpaceDifLogin}>{'or'}</Text>
              </View>
              <TextButton
                onPress={() => null}
                title={'ĐĂNG NHẬP VỚI GOOGLE'}
                wrapperStyle={styles.textButtonStyle}
              />
              <FacebookButton
                style={styles.textButtonStyle}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
  },
  backgroundStyle: {
    width: Platform.deviceWidth,
    height: Platform.deviceHeight,
    position: 'absolute',
  },
  wrapBallIcon: {
    // paddingBottom: 31,
    alignItems: 'center',
  },
  ballStyle: {
    height: 82,
    width: 82,
  },
  txtVnpitch: {
    fontFamily: 'Avenir-Black',
    fontSize: 30,
    color: '#fff',
    paddingTop: 16,
  },
  wrapFormInput: {
    width: '100%',
    paddingHorizontal: 15,
  },
  wrapSpaceDifLogin: {
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSpaceDifLogin: {
    fontFamily: 'HelveticaNeue',
    fontSize: 17,
    color: Platform.colorWhite,
  },
  wrapLoginDifType: {
    width: '100%',
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
  },
  spaceBetweenTextInput: {
    height: 17,
  },
  wrapRegisterBtn: {
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 16,
    paddingBottom: 24,
  },
  txtRegisterBtn: {
    fontSize: 14,
    color: Platform.titleColor,
    textDecorationLine: 'underline',
  },
  textButtonStyle: {
    borderWidth: 1,
    borderColor: Platform.colorWhite,
    borderRadius: 50,
    marginBottom: 24,
  },
});

export default Login;
