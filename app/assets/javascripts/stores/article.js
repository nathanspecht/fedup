(function(root) {
  'use strict';
  var _articles = [];
  var ADDED_ARTICLES = "added articles";

  var addArticles = function(articles) {
    _articles = _articles.concat(articles);
  };

  root.ArticleStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _articles.slice();
    },

    find: function(title) {
      var found = null;
      _articles.forEach(function(article){
        if (article.title === title) {
          found = article;
        }
      });

      return found;
    }
  });

  AppDispatcher.register(function(payload){
    switch(payload.actionType) {
    case ArticleConstants.ARTICLES_RECEIVED:
      addArticles(payload.articles);
      break;
    }
  });
}(this));
