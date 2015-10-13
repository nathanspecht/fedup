(function(root) {
  'use strict';
  var _feeds = [];
  var CHANGED_FEEDS = "change feeds";

  var resetFeeds = function(feeds) {
    _feeds = feeds;
  };

  root.FeedStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _feeds.slice();
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
    }
  });
}(this));
