ArticleShow = React.createClass({
  getInitialState: function() {
    return { article: this.props.article || {} };
  },

  _fillContent: function () {
    articleContent = React.findDOMNode(this.refs.articleContent);
    if (this.props.article) {
      articleContent.innerHTML = this.props.article.content;
    }
  },

  componentDidMount: function() {
    this._fillContent();
  },

  componentDidUpdate: function() {
    this._fillContent();
  },

  render: function() {
    var title;
    if (this.props.article) {
      title = this.props.article.title;
    }
    return (
      <div className="article-show">
        <h1>{title}</h1>
        <SaveArticleButton article={this.props.article} />
        <div ref="articleContent" className="article-content"></div>
      </div>
    );
  }
});
