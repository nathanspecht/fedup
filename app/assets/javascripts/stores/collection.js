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
