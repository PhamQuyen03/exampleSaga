import { API } from './common';

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
};

