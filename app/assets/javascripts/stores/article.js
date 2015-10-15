(function(root) {
  'use strict';
  var _articles = {};
  var _savedArticles = {};
  var ADDED_ARTICLES = "added articles";

  var addArticles = function(articleData) {
    var feed = articleData.feed;
    var articles = articleData.articles;
    articles.forEach(function(article){
      article.feed_id = feed.id;
      _articles[article.link] = article;
    });
  };

  var addSavedArticles = function(articles) {
    articles.forEach(function(article){
      _savedArticles[article.link] = article;
    });
  };

  root.ArticleStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      var articles = [];
      for (var link in _articles) {
        articles.push(_articles[link]);
      }

      return articles;
    },

    allSaved: function() {
      var savedArticles = [];
      for (var link in _savedArticles){
        savedArticles.push(_savedArticles[link]);
      }
      return savedArticles;
    },

    isSaved: function(article) {
      var articleIsSaved = false;
      this.allSaved().forEach(function(savedArticle){
        if (article.link === savedArticle.link) {
          articleIsSaved = true;
        }
      });

      return articleIsSaved;
    },

    findByFeed: function(feed) {
      var foundArticles = [];
      this.all().forEach(function(article){
        if (article.feed_id === feed.id) {
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
    case ArticleConstants.SAVED_ARTICLES_RECEIVED:
      addSavedArticles(payload.articles);
      ArticleStore.emit(ADDED_ARTICLES);
      break;
    }
  });
}(this));
