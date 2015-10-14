(function(root) {
  'use strict';
  var _articles = {};
  var ADDED_ARTICLES = "added articles";

  var addArticles = function(articleData) {
    var feed = articleData.feed;
    var articles = articleData.articles;
    articles.forEach(function(article){
      article.feedTitle = feed.title;
      _articles[article.link] = article;
    });
  };

  root.ArticleStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      var articles = [];
      for (var url in _articles) {
        articles.push(_articles[url]);
      }

      return articles;
    },

    findByFeed: function(feed) {
      var title = feed.title;
      var foundArticles = [];
      this.all().forEach(function(article){
        if (article.feedTitle === feed.title) {
          foundArticles.push(article);
        }
      });

      return foundArticles;
    },

    find: function(title) {
      var found = null;
      this.all().forEach(function(article){
        if (article.title === title) {
          found = article;
        }
      });

      return found;
    },

    addChangeListener: function(callback) {
      this.on(ADDED_ARTICLES, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(ADDED_ARTICLES, callback);
    }
  });

  AppDispatcher.register(function(payload){
    switch(payload.actionType) {
    case ArticleConstants.ARTICLES_RECEIVED:
      addArticles(payload.articleData);
      ArticleStore.emit(ADDED_ARTICLES);
      break;
    }
  });
}(this));
