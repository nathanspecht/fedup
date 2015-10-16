(function(root) {
  'use strict';
  var _collections = [];
  var ADDED_COLLECTIONS = "added collectioins";

  var addCollections = function(collections) {
    _collections = _collections.concat(collections);
  };

  root.CollectionStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _collections.slice();
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
    }
  });
}(this));
