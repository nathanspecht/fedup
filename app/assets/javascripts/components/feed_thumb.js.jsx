FeedThumb = React.createClass({
  getInitialState: function(){
    return { articles: [] };
  },

  // loadFeed: function () {
  //   var rssfeed = new google.feeds.Feed(this.props.feed.url);
  //   rssfeed.load(function(result){
  //     this.setState({ articles: result.feed.entries });
  //   }.bind(this));
  // },
  _updateArticles: function(articles) {
    this.setState({articles: articles});
  },

  componentDidMount: function() {
    ApiUtil.fetchArticles(this.props.feed, this._updateArticles);
  },

  render: function () {
    return (
      <div className="feed-preview">
        <h3>MOST RECENT FROM <span>{this.props.feed.title.toUpperCase()}</span></h3>
        {
          this.state.articles.slice(0, 2).map(function(article){
            return <ArticleThumb key={article.link} article={article} />;
          })
        }
      </div>
    );
  }
});
