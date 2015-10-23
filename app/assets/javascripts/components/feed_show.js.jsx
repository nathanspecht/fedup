FeedShow = React.createClass({
  getInitialState: function() {
    var feed = this.props.feed || FeedStore.find(this.props.params.id) || {};
    return {feed: feed,
            articles: ArticleStore.findByFeed(feed),
            articleHidden: "hidden",
            article: null};
  },

  _articlesUpdated: function() {
    this.setState({articles: ArticleStore.findByFeed(this.state.feed)});
  },

  _feedsUpdated: function() {
    this.setState({feed: this.props.feed || FeedStore.find(this.props.params.id)});
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
    var feed = this.props.feed || FeedStore.find(newProps.params.id);
    ApiUtil.fetchArticles(feed);
    this.setState({ feed: feed, articles: ArticleStore.findByFeed(feed) });
  },
  showArticle: function(article) {
    this.setState({articleHidden: "", article: article});
  },
  hideArticle: function() {
    this.setState({articleHidden: "hidden"});
  },

  render: function() {
    var tagline = this.state.feed.topic ? "#" + this.state.feed.topic : "";
    return (
      <div className="feed-index">
        <div className={this.props.condensed ? "hidden" : "feed-heading"}>
          <h1> {ApiUtil.stripHTML(this.state.feed.title)} </h1>
          <AddToCollectionButton feed={this.state.feed}/>
        </div>
        <div className="tagline">{tagline}</div>
        <div>
        {
          this.state.articles.map(function(article, i){
            return this.props.condensed ? (
               <CondensedArticleThumb key={article.link + i}
                                      article={article}
                                      showArticle={this.showArticle} />

            ) : (
               <ArticleThumb key={article.link + i}
                             article={article}
                             showArticle={this.showArticle} />
            );
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
