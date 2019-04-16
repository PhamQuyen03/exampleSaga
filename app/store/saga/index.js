import auth from './auth';
import token from './token';
import articles from './articles';
import { fork, all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([
    ...token.map(watcher => fork(watcher)),
    ...auth.map(watcher => fork(watcher)),
    ...articles.map(watcher => fork(watcher)),
  ]);
}

export default rootSaga;
