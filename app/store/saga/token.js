import jwtDecode from 'jwt-decode';
import API from '../api/auth';
import { updateTokens, refreshingToken, refreshedToken, removeIdentity } from '../actions/auth';
import { createRequestSaga } from './common';
import { call, take, all, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

function* requestGetAccessToken() {
  // is expired ?
  const { access_token } = yield select(_ => _.auth.tokens);

  try {
    const jwt = jwtDecode(access_token);

    if (Date.now() / 1000 > jwt.exp - 20) {
      // need refresh ?
      const { isRefreshingToken } = yield select(_ => _.auth.isRefreshingToken);

      if (isRefreshingToken) {
        return;
      }

      yield put({
        type: 'auth/refresh',
      });
      return;
    }

    yield put({
      type: 'auth/prepareAccessToken_Done',
      payload: {
        access_token,
      },
    });
  } catch (err) {
    yield put({
      type: 'auth/refresh',
    });
  }
}

function* requestGetRefreshToken() {
  // get from sessionStore ... ?
  // ...

  // need refresh ?
  const { isRefreshingToken } = yield select(_ => _.auth.isRefreshingToken);
  if (isRefreshingToken) {
    return;
  }

  const { refresh_token } = yield select(_ => _.auth.tokens);

  yield put({
    type: 'auth/prepareRefreshToken_Done',
    payload: {
      refresh_token,
    },
  });
}

const requestAccessToken = createRequestSaga({
  request: API.refreshAccessToken,
  start: [refreshingToken],
  cancel: 'auth/requestAccessToken', // is trick ? request access token chỉ thực hiện 1 request tại 1 thời điểm !
  success: [
    ({ access_token, refresh_token }) => updateTokens({ access_token, refresh_token }),

    ({ refresh_token }) => ({
      type: 'auth/prepareRefreshToken_Done',
      payload: {
        refresh_token,
      },
    }),
    ({ access_token }) => ({
      type: 'auth/prepareAccessToken_Done',
      payload: {
        access_token,
      },
    }),
  ],
  failure: [
    () => ({
      type: 'auth/prepareAccessToken_Done',
      payload: { access_token: null },
    }),

    () => ({
      type: 'auth/prepareRefreshToken_Done',
    }),

    data => {
      if (data.statusCode === 422 || data.statusCode === 400) {
        // empty token
        return removeIdentity();
      }

      return { type: 'noop' };
    },
  ],
  stop: [refreshedToken],
});

function* requestRefresh() {
  yield put({ type: 'auth/prepareRefreshToken' });

  const action = yield take('auth/prepareRefreshToken_Done');
  const { refresh_token } = action.payload;

  const isRefreshingToken = yield select(_ => _.auth.isRefreshingToken);
  if (isRefreshingToken) {
    return;
  }

  yield put({
    type: 'auth/requestAccessToken',
    args: [{ refresh_token }],
  });
}

const requestRevokeToken = createRequestSaga({
  request: API.logout,
  stop: [removeIdentity],
});

function* requestRevoke() {
  yield put({ type: 'auth/prepareRefreshToken' });

  const action = yield take('auth/prepareRefreshToken_Done');

  const { refresh_token } = action.payload;

  yield call(requestRevokeToken, {
    type: 'auth/requestRevokeToken',
    args: [
      {
        refresh_token,
      },
    ],
  });
}

export default [
  function* tokenProvider() {
    yield all([
      takeEvery('auth/prepareRefreshToken', requestGetRefreshToken),
      takeEvery('auth/prepareAccessToken', requestGetAccessToken),
    ]);
  },

  function* requestTokenWatcher() {
    yield all([
      takeLatest('auth/requestAccessToken', requestAccessToken),
      takeLatest('auth/refresh', requestRefresh),

      takeLatest('auth/logout', requestRevoke),
    ]);
  },
];
