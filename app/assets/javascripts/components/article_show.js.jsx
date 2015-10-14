FeedShow = React.createClass({
  getInitialState: function() {
    var feed = FeedStore.find(this.props.params.id);
    return {feed: feed, articles: []};
  },

  _updateArticles: function(articles) {
    this.setState({articles: articles});
  },

  componentDidMount: function() {
    ApiUtil.fetchArticles(this.state.feed, this._updateArticles);
  },

  render: function() {
    return (
      <div className="articleShow">
        <h1>{this.state.feed.title}</h1>
        <div className="tagline">#{this.state.feed.topic}</div>
        {this.state.articles.map(function(article){
           return <ArticleThumb key={article.link} article={article} />;
        })
      }</div>
    );
  }
});
