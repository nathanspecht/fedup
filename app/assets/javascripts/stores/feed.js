(function(root) {
  'use strict';
  var _feeds = [];
  var _selectedTopics = [];
  var CHANGED_FEEDS = "change feeds";

  var resetFeeds = function(feeds) {
    _feeds = feeds;
  };

  var updateFeed = function(feed) {
    var idx = FeedStore.ids().indexOf(feed.id);
    _feeds[idx] = feed;
  };

  var selectTopic = function(topicName) {
    _selectedTopics.push(topicName);
  };

  var deselectTopic = function(topicName) {
    var idx = _selectedTopics.indexOf(topicName);
    _selectedTopics.splice(idx, 1);
  };

  root.FeedStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _feeds.slice();
    },

    find: function(id) {
      var found;
      _feeds.forEach(function(feed){
        if (feed.id === parseInt(id)) {
          found = feed;
        }
      });

      return found;
    },

    findByUrl: function(url) {
      var foundFeed;
      _feeds.forEach(function(feed){
        if (feed.url === url) {
          foundFeed = feed;
        }
      });

      return foundFeed;
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

    selectedTopics: function() {
      var topics = {};
      _feeds.forEach(function(feed){
        if (feed.topic) {
          if (this.isSelectedTopic(feed.topic) || _selectedTopics.length === 0){
            if (topics[feed.topic]) {
              topics[feed.topic].push(feed);
            } else {
              topics[feed.topic] = [feed];
            }
          }
        }
      }.bind(this));
      return topics;
    },

    allTopics: function() {
      var topics = {};
      _feeds.forEach(function(feed){
        if (feed.topic) {
          if (topics[feed.topic]) {
            topics[feed.topic].push(feed);
          } else {
            topics[feed.topic] = [feed];
          }
        }
      });
      return topics;
    },

    isSelectedTopic: function(topicName) {
      return _selectedTopics.indexOf(topicName) !== -1;
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
    case FeedConstants.TOPIC_SELECTED:
      selectTopic(payload.topic);
      FeedStore.emit(CHANGED_FEEDS);
      break;
    case FeedConstants.TOPIC_DESELECTED:
      deselectTopic(payload.topic);
      FeedStore.emit(CHANGED_FEEDS);
      break;
    }
  });
}(this));
