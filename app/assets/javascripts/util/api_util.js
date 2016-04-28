ApiUtil = {
  fetchFeeds: function(params) {
    $.ajax({
      url: 'api/feeds',
      type: 'get',
      dataType: 'json',
      data: { 
        params: params 
      },
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
      data: { 
        article: article 
      },
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
      data: { 
        article: article 
      },
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
    $.ajax({
      url: 'api/feeds/' + feed.id,
      type: 'get',
      dataType: 'json',
      data: {
        feed_url: feed.url
      },
      success: function(articles) {
        ApiActions.receiveArticles(articles, feed);
      }
    });
  },

  fetchFirstArticle: function(feed) {
    $.ajax({
      url: 'api/feeds/' + feed.id,
      type: 'get',
      dataType: 'json',
      data: {
        feed_url: feed.url
      },
      success: function(articles) {
        ApiActions.receiveArticles(articles, feed);
      }
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
      data: {
        collection: collection
      },
      success: function(collection) {
        ApiActions.receiveCollections([collection]);
      }
    });
  },

  saveCollectionAndFeed: function(collection, feed) {
    $.ajax({
      url: 'api/collections',
      type: 'post',
      dataType: 'json',
      data: {
        collection: collection
      },
      success: function(collection) {
        ApiActions.receiveCollections([collection]);
        ApiUtil.addFeedToCollection(feed, collection);
      }
    });
  },

  addFeedToCollection: function(feed, collection) {
    feed.title = this.stripHTML(feed.title);

    $.ajax({
      url: 'api/collectionings',
      type: 'post',
      dataType: 'json',
      data: {
        collectioning: {
          feed: feed, 
          collection_id: collection.id
        }
      },
      success: function(data) {
        ApiActions.updateCollection(data.collection);
        ApiActions.updateFeed(data.feed);
      }
    });
  },

  removeFeedFromCollection: function(feed, collection) {
    if (!feed.id) {
      feed = FeedStore.findByUrl(feed.url);
    }

    $.ajax({
      url: 'api/collectionings',
      type: 'delete',
      dataType: 'json',
      data: {
        collectioning: {
          feed_id: feed.id, 
          collection_id: collection.id
        }
      },
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
