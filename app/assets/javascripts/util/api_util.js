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

  fetchArticles: function(feed, callback) {
    var rssfeed = new google.feeds.Feed(feed.url);
    rssfeed.load(function(result){
      callback(result.feed.entries);
    });
  }
};
