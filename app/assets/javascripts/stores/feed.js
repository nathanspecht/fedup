(function(root) {
  'use strict';
  var _feeds = [];
  var CHANGED_FEEDS = "change feeds";

  var resetFeeds = function(feeds) {
    _feeds = feeds;
  };

  var updateFeed = function(feed) {
    var idx = FeedStore.ids().indexOf(feed.id);
    _feeds[idx] = feed;
  };

  root.FeedStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _feeds.slice();
    },

    find: function(id) {
      var found = null;
      _feeds.forEach(function(feed){
        if (feed.id === parseInt(id)) {
          found = feed;
        }
      });

      return found;
    },

    ids: function() {
      return _feeds.map(function(feed){
        return feed.id;
      });
    },

    collectionTitles: function(feed) {
      return feed.collections.map(function(collection){
        return collection.title;
      });
    },

    addChangeListener: function(callback) {
      this.on(CHANGED_FEEDS, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGED_FEEDS, callback);
    }
  });

  AppDispatcher.register(function(payload){
    switch(payload.actionType) {
    case FeedConstants.FEEDS_RECEIVED:
      resetFeeds(payload.feeds);
      FeedStore.emit(CHANGED_FEEDS);
      break;
    case FeedConstants.FEED_UPDATED:
      updateFeed(payload.feed);
      FeedStore.emit(CHANGED_FEEDS);
      break;
    }
  });
}(this));
