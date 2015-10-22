SavedArticleIndex = React.createClass({
  getInitialState: function() {
    return {articles: [], articleHidden: "hidden", article: null};
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
  showArticle: function(article) {
    this.setState({articleHidden: "", article: article});
  },
  hideArticle: function() {
    this.setState({articleHidden: "hidden"});
  },
  render: function() {
    return (
      <div className="feedIndex">
        <h1>Saved</h1>
        <div className="tagline">Your saved articles</div>
        <div>
        {
          this.state.articles.map(function(article){
            return <ArticleThumb key={article.link}
                                 article={article}
                                 showArticle={this.showArticle} />;
                             }.bind(this))
        }
        </div>
        {
          <div className={"article-mod " + this.state.articleHidden}
               onClick={this.hideArticle}>
            <ArticleShow article={this.state.article} />
          </div>
        }
      </div>
    );
  }
});
