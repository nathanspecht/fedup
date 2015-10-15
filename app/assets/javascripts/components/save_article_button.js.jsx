SaveArticleButton = React.createClass({
  getInitialState: function() {
    if (ArticleStore.isSaved(this.props.article)) {
      return { clicked: "hidden", onClick: null, word: "saved" };
    } else {
      return { clicked: "unclicked", onClick: this.saveArticle, word: "save" };
    }
  },

  _updateSave: function() {
    if (ArticleStore.isSaved(this.props.article)) {
      this.setState({ clicked: "hidden", onClick: null, word: "saved" });
    } else {
      this.setState({ clicked: "unclicked", onClick: this.saveArticle, word: "save" });
    }
  },

  componentDidMount: function() {
    ArticleStore.addChangeListener(this._updateSave);
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._updateSave);
  },

  _hideButton: function() {
    this.setState({clicked: "hidden"});
  },

  saveArticle: function() {
    ApiUtil.saveArticle(this.props.article);
    this.setState({ clicked: "clicked", onClick: null, word: "saved" });
    window.setTimeout(this._hideButton, 5000);
  },

  render: function() {
    className = "save-button " + this.state.clicked;
    return(
      <div className={className}
           onClick={this.state.onClick}>
        <span>
          {this.state.word}
        </span>
     </div>
    );
  }
});
