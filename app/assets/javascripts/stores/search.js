(function(root) {
  'use strict';

  var _foundFeeds = [];
  var SEARCH_UPDATED = "SEARCH_UPDATED";

  var updateFoundFeeds = function(result) {
    _foundFeeds = [];
    _foundFeeds = _foundFeeds.concat(result.entries);
  };

  root.SearchStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _foundFeeds.slice();
    },

    addChangeListener: function(callback) {
      this.on(SEARCH_UPDATED, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(SEARCH_UPDATED, callback);
    }
  });

  AppDispatcher.register(function(payload){
    switch(payload.actionType){
      case SearchConstants.SEARCH_MADE:
        updateFoundFeeds(payload.result);
        SearchStore.emit(SEARCH_UPDATED);
        break;
    }
  });
}(this));
