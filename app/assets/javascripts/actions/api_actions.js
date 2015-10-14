ApiActions = {
  receiveAll: function(feeds) {
    AppDispatcher.dispatch({
      actionType: FeedConstants.FEEDS_RECEIVED,
      feeds: feeds
    });
  },
  receiveArticles: function(articles) {
    AppDispatcher.dispatch({
      actionType: ArticleConstants.ARTICLES_RECEIVED,
      articles: articles
    });
  }
};
