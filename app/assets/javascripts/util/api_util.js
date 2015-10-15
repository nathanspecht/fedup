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
