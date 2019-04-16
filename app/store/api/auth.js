import { API, withToken } from './common';

export default {
  getArticle: () =>
    API.get('/terms/full-size-articles',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    ),
  login: ({ email, password }) =>
    API.post('/users/login',
      {
        data: {
          email,
          password,
        },
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    ),

  changePassword: (token, { new_password: newPassword, old_password: oldPassword }) =>
    API.post(
      'auth/change-password',
      {
        newPassword,
        oldPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),

  loginViaFacebook: ({ token }) =>
    API.get(
      'auth/facebook',
      {},
      {
        headers: {
          Authorization: `Facebook ${token}`,
        },
      }
    ),

  loginViaGoogle: ({ token }) =>
    API.get(
      'auth/google',
      {},
      {
        headers: {
          Authorization: `Google ${token}`,
        },
      }
    ),

  logout: ({ refresh_token: refreshToken }) =>
    API.put('auth/logout', {
      refreshToken,
    }),

  refreshAccessToken: ({ refresh_token: refreshToken }) =>
    API.post('auth/refresh', {
      refreshToken,
    }),

  forgotPasswordViaEmail: ({ email }) => API.post('auth/forgot-password', { email }),
};
