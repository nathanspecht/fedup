SavedArticleIndex = React.createClass({
  getInitialState: function() {
    return {articles: []};
  },

  _articlesUpdated: function() {
    this.setState({articles: ArticleStore.allSaved()});
  },

  componentDidMount: function() {
    ArticleStore.addChangeListener(this._articlesUpdated);
    ApiUtil.fetchSavedArticles();
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._articlesUpdated);
  },

  render: function() {
    return (
      <div className="feedIndex">
        <h1>Saved</h1>
        <div>
        {
          this.state.articles.map(function(article){
            console.log(article.link);
            return <ArticleThumb key={article.link} article={article} />;
          })
        }
        </div>
      </div>
    );
  }
});
