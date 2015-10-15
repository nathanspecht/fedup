SaveArticleButton = React.createClass({
  getInitialState: function() {
    if (ArticleStore.isSaved(this.props.article)) {
      return { clicked: "clicked", onClick: null, word: "saved" };
    } else {
      return { clicked: "unclicked", onClick: this.saveArticle, word: "save" };
    }
  },
  saveArticle: function() {
    ApiUtil.saveArticle(this.props.article);
    this.setState({ clicked: "clicked", onClick: null, word: "saved" });
  },
  render: function() {
    className = "save-button " + this.state.clicked;
    return(
      <div className={className}
           onClick={this.state.onClick}>{this.state.word}</div>
    );
  }
});
