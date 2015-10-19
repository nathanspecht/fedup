ApiUtil = {
  fetchFeeds: function(params) {
    $.ajax({
      url: 'api/feeds',
      type: 'get',
      dataType: 'json',
      data: { params: params },
      success: function(feeds) {
        ApiActions.receiveAll(feeds);
      }
    });
  },

  fetchSavedArticles: function() {
    $.ajax({
      url: 'api/articles',
      type: 'get',
      dataType: 'json',
      success: function(articles) {
        ApiActions.receiveSavedArticles(articles);
      }
    });
  },

  fetchCollections: function() {
    $.ajax({
      url: 'api/collections',
      type: 'get',
      dataType: 'json',
      success: function(collections) {
        ApiActions.receiveCollections(collections);
      }
    });
  },

  saveArticle: function(article) {
    $.ajax({
      url: 'api/articles',
      type: 'post',
      dataType: 'json',
      data: { article: article },
      success: function(article) {
        ApiActions.receiveSavedArticles([article]);
      }
    });
  },

  unSaveArticle: function(article) {
    $.ajax({
      url: 'api/saves',
      type: 'delete',
      dataType: 'json',
      data: { article: article },
      success: function(data) {
        ApiActions.removeSavedArticle(data.articleLink);
      }
    });
  },

  logout: function() {
    $.ajax({
      url: '/session',
      type: 'delete',
      success: function() {
        window.location = "/";
      }
    });
  },

  fetchArticles: function(feed) {
    var rssfeed = new google.feeds.Feed(feed.url);
    rssfeed.load(function(result){
      ApiActions.receiveArticles(result.feed.entries, feed);
    });
  },

  saveCollection: function(collection) {
    $.ajax({
      url: 'api/collections',
      type: 'post',
      dataType: 'json',
      data: {collection: collection},
      success: function(collection) {
        ApiActions.receiveCollections([collection]);
      }
    });
  },

  addFeedToCollection: function(feed, collection) {
    $.ajax({
      url: 'api/collectionings',
      type: 'post',
      dataType: 'json',
      data: {collectioning: {feed_id: feed.id, collection_id: collection.id}},
      success: function(data) {
        ApiActions.updateCollection(data.collection);
        ApiActions.updateFeed(data.feed);
      }
    });
  }
};
