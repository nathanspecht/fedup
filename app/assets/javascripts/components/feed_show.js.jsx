FeedShow = React.createClass({
  getInitialState: function() {
    var feed = FeedStore.find(this.props.params.id) || {};
    return {feed: feed, articles: ArticleStore.findByFeed(feed)};
  },

  _articlesUpdated: function() {
    this.setState({articles: ArticleStore.findByFeed(this.state.feed)});
  },

  _feedsUpdated: function() {
    this.setState({feed: FeedStore.find(this.props.params.id)});
    ApiUtil.fetchArticles(this.state.feed);
  },

  componentDidMount: function() {
    FeedStore.addChangeListener(this._feedsUpdated);
    ArticleStore.addChangeListener(this._articlesUpdated);
    ApiUtil.fetchArticles(this.state.feed);
  },

  componentWillUnmount: function() {
    FeedStore.removeChangeListener(this._feedsUpdated);
    ArticleStore.removeChangeListener(this._articlesUpdated);
  },

  componentWillReceiveProps: function (newProps) {
    var feed = FeedStore.find(newProps.params.id);
    ApiUtil.fetchArticles(feed);
    this.setState({ feed: feed, articles: ArticleStore.findByFeed(feed) });
  },

  render: function() {
    return (
      <div className="feed-index">
        <div className="feed-heading">
          <h1>{this.state.feed.title}</h1>
          <AddToCollectionButton feed={this.state.feed}/>
        </div>
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
