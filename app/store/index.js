import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './saga';
import { refreshedToken } from './actions/auth';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

/*eslint-disable */
if (__DEV__) {
  !window.devToolsExtension && middlewares.push(require('./logger').default);
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  GLOBAL.FormData = GLOBAL.originalFormData;
}
/* eslint-enable */

const configStore = () =>
  new Promise(resolve => {
    const enhancer = [applyMiddleware(...middlewares)];
    window.devToolsExtension && enhancer.push(window.devToolsExtension()); // eslint-disable-line
    let persistedReducer = null;

    persistedReducer = persistReducer(
      {
        key: 'root',
        storage: AsyncStorage,
        whitelist: ['auth', 'locale', 'theme'],
        blacklist: ['requests'],
      },
      reducers
    );
    const store = createStore(persistedReducer, undefined, compose(...enhancer));
    sagaMiddleware.run(rootSaga);
    persistStore(store, null, () => {
      store.dispatch(refreshedToken());
      resolve(store);
    });
  });

export default configStore;
