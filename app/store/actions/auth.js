export const login = ({ email, password }, ...etc) => ({
  type: 'auth/login',
  args: [
    {
      email,
      password,
    },
    ...etc,
  ],
});

export const loginViaFacebook = ({ token }, ...etc) => ({
  type: 'auth/loginViaFacebook',
  args: [
    {
      token,
    },
    ...etc,
  ],
});

export const loginViaGoogle = ({ token }) => ({
  type: 'auth/loginViaGoogle',
  args: [{ token }],
});

// TOKEN

export const logout = () => ({
  type: 'auth/logout',
});

export const refreshToken = ({ refresh_token: refreshToken }) => ({
  type: 'auth/refreshAccessToken',
  args: [{ refreshToken }],
});

export const removeIdentity = () => ({
  type: 'auth/removeIdentity',
});

export const updateTokens = ({ access_token: accessToken, refresh_token: refreshToken }) => ({
  type: 'auth/updateTokens',
  payload: {
    accessToken,
    refreshToken,
  },
});

export const refreshingToken = () => ({
  type: 'auth/refreshingToken',
});

export const refreshedToken = () => ({
  type: 'auth/refreshedToken',
});

