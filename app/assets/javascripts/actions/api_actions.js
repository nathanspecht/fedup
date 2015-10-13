ApiActions = {
  receiveAll: function(feeds) {
    AppDispatcher.dispatch({
      actionType: FeedConstants.FEEDS_RECEIVED,
      feeds: feeds
    });
  }
};
