ArticleShow = React.createClass({
  getInitialState: function() {
    return { article: this.props.location.query.article };
  },

  componentDidMount: function() {
    articleContent = React.findDOMNode(this.refs.articleContent);
    articleContent.innerHTML = this.state.article.content;
  },

  render: function() {
    return (
      <div className="article-show">
        <h1>{this.state.article.title}</h1>
        <div ref="articleContent"></div>
      </div>
    );
  }
});
