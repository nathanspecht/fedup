FeedIndex = React.createClass({
  getInitialState: function() {
    return { feeds: FeedStore.all() };
  },

  _feedChange: function() {
    this.setState({ feeds: FeedStore.all() });
  },

  componentDidMount: function() {
    ApiUtil.fetchFeeds();
    FeedStore.addChangeListener(this._feedChange);
  },

  componenetWillUnmount: function() {
    FeedStore.removeChangeListener(this._feedChange);
  },

  render: function() {
    return (
      <div className="feedIndex">
        <h1>All</h1>
        <div className="tagline">The most recent stories in your fedup today</div>
        { this.state.feeds.map(function(feed){
            return <FeedThumb key={feed.id} feed={feed} />;
        })
      }</div>
    );
  }
});
