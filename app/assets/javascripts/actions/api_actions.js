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
  },
  receiveSavedArticles: function(articles) {
    AppDispatcher.dispatch({
      actionType: ArticleConstants.SAVED_ARTICLES_RECEIVED,
      articles: articles
    });
  },
  removeSavedArticle: function(articleLink) {
    AppDispatcher.dispatch({
      actionType: ArticleConstants.SAVED_ARTICLE_REMOVED,
      articleLink: articleLink
    });
  },
  receiveCollections: function(collections) {
    AppDispatcher.dispatch({
      actionType: CollectionConstants.COLLECTIONS_RECEIVED,
      collections: collections
    });
  }
};
