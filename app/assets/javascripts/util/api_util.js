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
    rssfeed.includeHistoricalEntries();
    rssfeed.setNumEntries(10);
    rssfeed.load(function(result){
      ApiActions.receiveArticles(result.feed.entries, feed);
    });
  },

  fetchFirstArticle: function(feed) {
    var rssfeed = new google.feeds.Feed(feed.url);
    rssfeed.setNumEntries(1);
    rssfeed.load(function(result){
      ApiActions.receiveArticles(result.feed.entries, feed);
    });
  },

  searchFeeds: function(search) {
    google.feeds.findFeeds(search, function(result){
      ApiActions.receiveFoundFeeds(result);
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
    feed.title = this.stripHTML(feed.title);
    
    $.ajax({
      url: 'api/collectionings',
      type: 'post',
      dataType: 'json',
      data: {collectioning: {feed: feed, collection_id: collection.id}},
      success: function(data) {
        ApiActions.updateCollection(data.collection);
        ApiActions.updateFeed(data.feed);
      }
    });
  },

  removeFeedFromCollection: function(feed, collection) {
    $.ajax({
      url: 'api/collectionings',
      type: 'delete',
      dataType: 'json',
      data: {collectioning: {feed_id: feed.id, collection_id: collection.id}},
      success: function(data) {
        ApiActions.updateCollection(data.collection);
        ApiActions.updateFeed(data.feed);
      }
    });
  },

  stripHTML: function(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
};
