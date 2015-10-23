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

  _delayUpdateSave: function() {
    window.setTimeout(this._updateSave, 1000);
  },

  componentDidMount: function() {
    this._updateSave();
    ArticleStore.addChangeListener(this._delayUpdateSave);
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._delayUpdateSave);
  },

  unSaveArticle: function() {
    ApiUtil.unSaveArticle(this.props.article);
    this.setState({ clicked: "clicked", onClick: null, word: "unsaved" });
    window.setTimeout(this._makeSave, 1000);
  },

  _makeUnSave: function() {
    this.setState({clicked: "unclicked", onClick: this.unSaveArticle, word: "unsave"});
  },

  _makeSave: function() {
    this.setState({ clicked: "unclicked", onClick: this.saveArticle, word: "save" });
  },

  saveArticle: function() {
    ApiUtil.saveArticle(this.props.article);
    this.setState({ clicked: "clicked", onClick: null, word: "saved" });
    window.setTimeout(this._makeUnSave, 1000);
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
