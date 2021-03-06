(function(root) {
  'use strict';
  var _collections = [];
  var ADDED_COLLECTIONS = "added collectioins";

  var addCollections = function(collections) {
    _collections = _collections.concat(collections);
  };

  var updateCollection = function(collection) {
    var idx = CollectionStore.ids().indexOf(collection.id);
    _collections[idx] = collection;
  };


  root.CollectionStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _collections.slice();
    },

    find: function(id) {
      var found;
      _collections.forEach(function(collection){
        if (collection.id === parseInt(id)) {
          found = collection;
        }
      });
      return found;
    },

    collectedFeeds: function() {
      var feeds = {};
      _collections.forEach(function(collection){
        collection.feeds.forEach(function(feed){
          feeds[feed.url] = feed;
        });
      });
      return Object.keys(feeds).map(function(url){return feeds[url];});
    },

    feedUrls: function(collection) {
      return collection.feeds.map(function(feed){
        return feed.url;
      });
    },

    ids: function() {
      return _collections.map(function(collection){
        return collection.id;
      });
    },

    addChangeListener: function(callback) {
      this.on(ADDED_COLLECTIONS, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(ADDED_COLLECTIONS, callback);
    }
  });

  CollectionStore.setMaxListeners(100);

  AppDispatcher.register(function(payload){
    switch(payload.actionType) {
    case CollectionConstants.COLLECTIONS_RECEIVED:
      addCollections(payload.collections);
      CollectionStore.emit(ADDED_COLLECTIONS);
      break;
    case CollectionConstants.COLLECTION_UPDATED:
      updateCollection(payload.collection);
      CollectionStore.emit(ADDED_COLLECTIONS);
      break;
    }
  });
}(this));
