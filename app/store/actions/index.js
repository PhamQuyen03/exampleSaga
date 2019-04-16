import {
  login, logout,
  loginViaFacebook,
  loginViaGoogle,
} from '../actions/auth';
import {
  getArticle,
  getArticleSuccess,
} from '../actions/articles';


export default {
  getArticleSuccess,
  getArticle,
  login,
  logout,
  loginViaFacebook,
  loginViaGoogle,
};
