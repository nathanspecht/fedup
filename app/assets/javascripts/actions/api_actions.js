ApiActions = {
  receiveAll: function(feeds) {
    AppDispatcher.dispatch({
      actionType: FeedConstants.FEEDS_RECEIVED,
      feeds: feeds
    });
  },
  receiveArticles: function(articles, feed) {
    AppDispatcher.dispatch({
      actionType: ArticleConstants.ARTICLES_RECEIVED,
      articleData: {feed: feed, articles: articles}
    });
  }
};
