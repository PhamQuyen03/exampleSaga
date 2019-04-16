import { combineReducers } from 'redux';
import { locale, theme, navigator } from './common';
import { auth } from './auth';
import { articles } from './articles';

export default combineReducers({
  articles,
  auth,
  locale,
  theme,
  navigator,
});
