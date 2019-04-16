export const getArticle = (...callback) => ({
  type: 'article',
  args: [...callback],
});
export const getArticleSuccess = article => ({
  type: 'article_SUCCESS',
  payload: article,
});
