ArticleShow = React.createClass({
  getInitialState: function() {
    var article =  ArticleStore.find(this.props.params.title) || {};
    var feed = FeedStore.find(this.props.params.feed_id) || {};
    return { article: article, feed: feed };
  },

  _fillContent: function () {
    articleContent = React.findDOMNode(this.refs.articleContent);
    articleContent.innerHTML = this.state.article.content;
  },

  _updateArticle: function() {
    this.setState({ article: ArticleStore.find(this.props.params.title) || {}});
    this._fillContent();
  },

  _updateFeed: function() {
    var feed = FeedStore.find(this.props.params.feed_id) || {};
    ApiUtil.fetchArticles(feed);
    this.setState({ feed: feed });
  },

  componentDidMount: function() {
    FeedStore.addChangeListener(this._updateFeed);
    ArticleStore.addChangeListener(this._updateArticle);
    this._fillContent();
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._updateArticle);
  },

  render: function() {
    return (
      <div className="article-show">
        <h1>{this.state.article.title}</h1>
        <SaveArticleButton article={this.state.article} />
        <div ref="articleContent" className="article-content"></div>
      </div>
    );
  }
});
