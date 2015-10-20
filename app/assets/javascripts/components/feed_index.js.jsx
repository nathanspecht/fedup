FeedIndex = React.createClass({

  getInitialState: function() {
    return { feeds: CollectionStore.collectedFeeds() };
  },

  _collectionChange: function() {
    this.setState({ feeds: CollectionStore.collectedFeeds() });
  },

  componentDidMount: function() {
    CollectionStore.addChangeListener(this._collectionChange);
  },

  componenetWillUnmount: function() {
    CollectionStore.removeChangeListener(this._collectionChange);
  },

  render: function() {
    return (
      <div className="feedIndex">
        <h1>Today</h1>
        <div className="tagline">The most recent stories in your fedup today</div>
        { this.state.feeds.map(function(feed){
            return <FeedPreview key={feed.id} feed={feed} />;
        })
      }</div>
    );
  }
});
