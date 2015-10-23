FeedSearchItem = React.createClass({
  getInitialState: function() {
    return {feedHidden: "hidden", selected: ""};
  },

  _toggleFeed: function() {
    feedHidden = this.state.feedHidden === "" ? "hidden" : "";
    selected = this.state.feedHidden === "" ? "" : "selected-background";
    this.setState({feedHidden: feedHidden, selected: selected});
    window.setTimeout(this._lightenBackground, 1);
  },

  _lightenBackground: function() {
    this.setState({selected: "transition selected-background"});
    this.setState({selected: "transition"});
  },

  render: function() {
    return (
      <div className={"search-result-with-articles " + this.state.selected}>
        <li className={"search-result-item"} onClick={this._toggleFeed}>
          <span className="title">{ApiUtil.stripHTML(this.props.feed.title)}</span>
          <span className="description">{ApiUtil.stripHTML(this.props.feed.contentSnippet)}</span>
        </li>
        <div className={"feed-show-condensed " + this.state.feedHidden}>
          <AddToCollectionButton feed={this.props.feed}/>
          <FeedShow feed={this.props.feed} condensed="true"/>
        </div>
      </div>
    );
  }
});
