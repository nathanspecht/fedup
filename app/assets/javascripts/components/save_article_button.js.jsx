SaveArticleButton = React.createClass({
  getInitialState: function() {
    return { clicked: false };
  },
  saveArticle: function() {
    ApiUtil.saveArticle(this.props.article);
    this.setState({ clicked: true });
  },
  render: function() {
    return(
      <div className="save-button" onClick={this.saveArticle}>save</div>
    );
  }
});
