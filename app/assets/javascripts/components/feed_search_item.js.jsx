FeedSearchItem = React.createClass({
  getInitialState: function() {
    return {feedHidden: "hidden"};
  },

  toggleFeed: function() {
    feedHidden = this.state.feedHidden === "" ? "hidden" : "";
    this.setState({feedHidden: feedHidden});
  },

  render: function() {
    return (
      <div>
        <li className="search-result-item" onClick={this.toggleFeed}>
          <span className="title">{ApiUtil.stripHTML(this.props.feed.title)}</span>
          <span className="description">{ApiUtil.stripHTML(this.props.feed.contentSnippet)}</span>
        </li>
        <div className={this.state.feedHidden}>
          <FeedShow feed={this.props.feed}/>
        </div>
      </div>
    );
  }
});
