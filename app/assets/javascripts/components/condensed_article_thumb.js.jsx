CondensedArticleThumb = React.createClass({
  mixins: [ReactRouter.History],

  render: function () {
    return (
      <div onMouseEnter={this._showButtons}
           onMouseLeave={this._hideButtons}
           className="article-preview condensed">
        <div className="thumb-text">
          <h4 onClick={this.props.showArticle.bind(null, this.props.article)}>{this.props.article.title}</h4>
          <div className="snippet">{this.props.article.contentSnippet}</div>
        </div>
      </div>
    );
  }
});
