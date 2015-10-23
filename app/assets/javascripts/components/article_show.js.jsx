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

  prevent: function(e) {
    e.stopPropagation();
  },
  
  render: function() {
    var title;
    var saveButton;
    if (this.props.article) {
      title = this.props.article.title;
      saveButton = <SaveArticleButton article={this.props.article} />;
    }
    return (
      <div className="article-show" onClick={this.prevent}>
        <h1>{title}</h1>
        {saveButton}
        <div ref="articleContent" className="article-content"></div>
      </div>
    );
  }
});
