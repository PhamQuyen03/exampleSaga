
const initialState = {
  category_article: [],
};

// eslint-disable-next-line import/prefer-default-export
export const articles = (state = initialState, action) => {
  switch (action.type) {
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

