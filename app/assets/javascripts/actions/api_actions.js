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
  },
  updateCollection: function(collection) {
    AppDispatcher.dispatch({
      actionType: CollectionConstants.COLLECTION_UPDATED,
      collection: collection
    });
  },
  updateFeed: function(feed){
    AppDispatcher.dispatch({
      actionType: FeedConstants.FEED_UPDATED,
      feed: feed
    });
  },
  selectTopic: function(topic){
    AppDispatcher.dispatch({
      actionType: FeedConstants.TOPIC_SELECTED,
      topic: topic
    });
  },
  deselectTopic: function(topic){
    AppDispatcher.dispatch({
      actionType: FeedConstants.TOPIC_DESELECTED,
      topic: topic
    });
  },
  receiveFoundFeeds: function(result){
    AppDispatcher.dispatch({
      actionType: SearchConstants.SEARCH_MADE,
      result: result
    });
  }
};
