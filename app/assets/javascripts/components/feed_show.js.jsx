FeedShow = React.createClass({
  getInitialState: function() {
    var feed = FeedStore.find(this.props.params.id) || {};
    return {feed: feed, articles: ArticleStore.findByFeed(feed)};
  },

  _articlesUpdated: function() {
    this.setState({articles: ArticleStore.findByFeed(this.state.feed)});
  },

  componentDidMount: function() {
    ArticleStore.addChangeListener(this._articlesUpdated);
    ApiUtil.fetchArticles(this.state.feed);
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._articlesUpdated);
  },

  componentWillReceiveProps: function (newProps) {
    var feed = FeedStore.find(newProps.params.id);
    this.setState({ feed: feed, articles: ArticleStore.findByFeed(feed) });
  },

  render: function() {
    return (
      <div className="feedIndex">
        <h1>{this.state.feed.title}</h1>
        <div className="tagline">#{this.state.feed.topic}</div>
        <div>
        {
          this.state.articles.map(function(article, i){
            console.log(article.link);
            return <ArticleThumb key={article.link + i} article={article} />;
          })
        }
        </div>
      </div>
    );
  }
});
