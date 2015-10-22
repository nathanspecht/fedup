FeedSearchItem = React.createClass({
  showFeed: function() {
    
  },
  render: function() {
    return (
      <li className="search-result-item" onClick={this.showFeed}>
        <span className="title">{ApiUtil.stripHTML(this.props.feed.title)}</span>
        <span className="description">{ApiUtil.stripHTML(this.props.feed.contentSnippet)}</span>
      </li>
    );
  }
});
