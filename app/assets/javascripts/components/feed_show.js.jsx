FeedShow = React.createClass({
  getInitialState: function() {
    return {articles: []};
  },

  _updateArticles: function(articles) {
    this.setState({articles: articles});
  },

  componentDidMount: function() {
    ApiUtil.fetchArticles(this.props.location.query.feed, this._updateArticles);
  },

  render: function() {
    return (
      <div className="feedIndex">
        <h1>{this.props.location.query.feed.title}</h1>
        <div className="tagline">#{this.props.location.query.feed.topic}</div>
        {this.state.articles.map(function(article){
           return <ArticleThumb key={article.id} article={article} />;
        })
      }</div>
    );
  }
});
