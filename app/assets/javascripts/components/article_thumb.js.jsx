ArticleThumb = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function() {
    return {hidden: "hidden"};
  },

  addImage: function() {
    var imageDiv = React.findDOMNode(this.refs.thumbImage);
    var imageSrc = $(this.props.article.content).find('img').eq(0).attr('src') ||
                   $(this.props.article.content).filter('img').eq(0).attr('src');
    if (imageSrc) {
      imageDiv.style.backgroundImage = "url(" + imageSrc + ")";
    }
  },

  componentDidMount: function() {
    this.addImage();
  },

  showArticle: function() {
    var articleUrl = "articles/" + this.props.article.feed_id + "/" + this.props.article.title;
    this.history.pushState(null, articleUrl);
  },

  _showButtons: function() {
    this.setState({hidden: ""});
  },

  _hideButtons: function() {
    this.setState({hidden: "hidden"});
  },

  render: function () {
    return (
      <div onMouseEnter={this._showButtons}
           onMouseLeave={this._hideButtons}
           className="article-preview">
        <div ref="thumbImage" className="thumb-image"></div>
        <div className="thumb-text">
          <h4 onClick={this.showArticle}>{this.props.article.title}</h4>
          <div className="snippet">{this.props.article.contentSnippet}</div>
          <div className={this.state.hidden}>
            <SaveArticleButton article={this.props.article} />
          </div>
        </div>
      </div>
    );
  }
});
