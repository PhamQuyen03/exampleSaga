
const initialState = {
  tokens: {
    access_token: null,
    refresh_token: null,
    refreshing: false, // token is refreshing
  },
  isRefreshingToken: false,

  identity: null,
};

// eslint-disable-next-line import/prefer-default-export
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'auth/refreshingToken':
      return {
        ...state,
        isRefreshingToken: true,
      };
    case 'auth/refreshedToken': {
      return {
        ...state,
        isRefreshingToken: false,
      };
    }
    case 'auth/updateTokens': {
      const { refresh_token: refreshToken, accessToken } = action.payload;
      return {
        ...state,
        isRefreshingToken: false,
        tokens: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      };
    }
    case 'auth/removeIdentity': {
      return {
        ...state,
        isRefreshingToken: false,
        tokens: {
          access_token: null,
          refresh_token: null,
        },
        identity: null,
      };
    }
    case 'article': {
      console.log('article', action);
      return state;
    }
    case 'article_SUCCESS': {
      console.log('###payload', action);
      return state;
    }

    default:
      return state;
  }
};

