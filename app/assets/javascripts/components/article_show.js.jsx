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
    this.hideSmallImages();
  },

  componentDidUpdate: function() {
    React.findDOMNode(this.refs.articleShow).scrollTop = 0;
    this._fillContent();
    this.hideSmallImages();
  },

  prevent: function(e) {
    e.stopPropagation();
  },

  hideSmallImages: function() {
    var articleContent = React.findDOMNode(this.refs.articleContent);
    var links = $(articleContent).find('a');
    links.each(function(idx){
      if (links.eq(idx)[0].rel === "nofollow") {
        links.eq(idx).hide();
      }
    });
  },

  render: function() {
    var title;
    var saveButton;
    if (this.props.article) {
      title = this.props.article.title;
      saveButton = <SaveArticleButton article={this.props.article} />;
    }
    return (
      <div className="article-show"
           onClick={this.prevent}
           ref="articleShow">
        <h1>{title}</h1>
        {saveButton}
        <div ref="articleContent" className="article-content"></div>
      </div>
    );
  }
});
