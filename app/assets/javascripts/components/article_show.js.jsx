ArticleShow = React.createClass({
  getInitialState: function() {
    return { article: ArticleStore.find(this.props.params.title) };
  },

  componentDidMount: function() {
    articleContent = React.findDOMNode(this.refs.articleContent);
    articleContent.innerHTML = this.state.article.content;
  },

  render: function() {
    return (
      <div className="article-show">
        <h1>{this.state.article.title}</h1>
        <SaveArticleButton article={this.state.article} />
        <div ref="articleContent"></div>
      </div>
    );
  }
});
