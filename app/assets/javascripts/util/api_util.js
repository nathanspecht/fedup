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
  }
};
