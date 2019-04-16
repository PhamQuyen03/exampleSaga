

import AuthAPI from '../api/auth';
import { updateTokens, removeIdentity, getArticleSuccess } from '../actions/auth';

import { createRequestSaga } from './common';
import { all, takeLatest, takeEvery } from 'redux-saga/effects';

const requestLogin = createRequestSaga({
  request: AuthAPI.login,
  success: [updateTokens],
  error: [removeIdentity],
});

const requestLoginViaFacebook = createRequestSaga({
  request: AuthAPI.loginViaFacebook,
  success: [updateTokens],
});

const requestLoginViaGoogle = createRequestSaga({
  request: AuthAPI.loginViaGoogle,
  success: [updateTokens],
});

const getArticle = createRequestSaga({
  request: AuthAPI.getArticle,
  success: [getArticleSuccess],
});

export default [
  // function* registerWatcher() {
  //   yield all([takeLatest('auth/register', requestRegister)]);
  // },
  function* authenticateWatcher() {
    yield all([
      takeLatest('auth/login', requestLogin),
      takeLatest('auth/loginViaFacebook', requestLoginViaFacebook),
      // takeLatest('auth/forgotPasswordViaEmail', requestForgotPasswordViaEmail),
      takeLatest('auth/loginViaGoogle', requestLoginViaGoogle),
      takeEvery('article', getArticle),
    ]);
  },

  // function* profileWatcher() {
  //   yield all([
  //     takeLatest('auth/update/user', requestUpdateUserInfo),
  //   ]);
  // },
];
