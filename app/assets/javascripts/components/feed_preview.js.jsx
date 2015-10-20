FeedPreview = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function(){
    return { articles: ArticleStore.findByFeed(this.props.feed) };
  },

  _articlesUpdated: function() {
    this.setState({articles: ArticleStore.findByFeed(this.props.feed)});
  },

  componentDidMount: function(){
    ArticleStore.addChangeListener(this._articlesUpdated);
    ApiUtil.fetchArticles(this.props.feed);
  },

  componentWillUnmount: function(){
    ArticleStore.removeChangeListener(this._articlesUpdated);
  },

  showFeed: function() {
    var feedUrl = "feeds/" + this.props.feed.id;
    this.history.pushState(null, feedUrl);
  },

  render: function () {
    return (
      <div className="feed-preview">
        <div className="h3">
          <span>MOST RECENT FROM </span>
          <span className="feed-link" onClick={this.showFeed}>
            {this.props.feed.title.toUpperCase()}
          </span>
        </div>
        {
          this.state.articles.slice(0, 2).map(function(article){
            return <ArticleThumb key={article.link} article={article} />;
          })
        }
      </div>
    );
  }
});
