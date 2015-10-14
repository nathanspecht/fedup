FeedThumb = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function(){
    return { articles: [] };
  },

  _updateArticles: function(articles) {
    this.setState({articles: articles});
  },

  componentDidMount: function() {
    ApiUtil.fetchArticles(this.props.feed, this._updateArticles);
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
