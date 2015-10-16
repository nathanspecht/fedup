SaveArticleButton = React.createClass({
  getInitialState: function() {
    if (ArticleStore.isSaved(this.props.article)) {
      return { clicked: "unclicked", onClick: this.unSaveArticle, word: "unsave" };
    } else {
      return { clicked: "unclicked", onClick: this.saveArticle, word: "save" };
    }
  },

  _updateSave: function() {
    if (ArticleStore.isSaved(this.props.article)) {
      this.setState({ clicked: "unclicked", onClick: this.unSaveArticle, word: "unsave" });
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

  unSaveArticle: function() {
    ApiUtil.unSaveArticle(this.props.article);
    this.setState({ clicked: "unclicked", onClick: this.saveArticle, word: "save" });
  },

  _hideButton: function() {
    this.setState({clicked: "hidden"});
  },

  saveArticle: function() {
    ApiUtil.saveArticle(this.props.article);
    this.setState({ onClick: this.saveArticle, word: "unsave" });
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
