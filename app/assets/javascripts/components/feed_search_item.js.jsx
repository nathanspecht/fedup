FeedSearchItem = React.createClass({
  render: function() {
    return (
      <li className="search-result-item">
        <span className="title">{ApiUtil.stripHTML(this.props.feed.title)}</span>
        <span className="description">{ApiUtil.stripHTML(this.props.feed.contentSnippet)}</span>
      </li>
    );
  }
});
