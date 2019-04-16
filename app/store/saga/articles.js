import AuthAPI from '../api/auth';
import { getArticleSuccess } from '../actions/articles';

import { createRequestSaga } from './common';
import { all, takeEvery, call, put } from 'redux-saga/effects';

// const getArticle = createRequestSaga({
//   request: AuthAPI.getArticle,
//   success: [getArticleSuccess],
// });
function* getArticle(action) {
  let response;
  console.log('###action', action);
  try {
    response = yield call(AuthAPI.getArticle);
    yield put({ type: 'article_SUCCESS', response });

    // dispatch a success action to the store with the new dog
  } catch (error) {
    yield put({ type: 'article_ERROR', response });
  } finally {
    let args = action.args || [];
    const callback = typeof args[args.length - 1] === 'function' ? args[args.length - 1] : null;
    if (callback) {
      args = args.slice(0, -1);
      const { data: { result, errors } } = response;
      callback.call(this, result, errors);
      // OR
      // put({ type: 'callback/invoke', payload: callback.call(this, result, errors)})
    }
  }
}

export default [
  // function* registerWatcher() {
  //   yield all([takeLatest('auth/register', requestRegister)]);
  // },
  function* article() {
    yield all([
      takeEvery('article', getArticle),
    ]);
  },

  // function* profileWatcher() {
  //   yield all([
  //     takeLatest('auth/update/user', requestUpdateUserInfo),
  //   ]);
  // },
];
