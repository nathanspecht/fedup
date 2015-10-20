AllFeeds = React.createClass({
  getInitialState: function() {
    return {feeds: FeedStore.all()};
  },
  updateFeeds: function() {
    this.setState({feeds: FeedStore.all()});
  },
  componentDidMount: function() {
    FeedStore.addChangeListener(this.updateFeeds);
  },
  componenetWillUnmount: function() {
    FeedStore.removeChangeListener(this.updateFeeds);
  },
  render: function() {
    return (
      <div className="feedIndex">
        <h1>Explore</h1>
        <div className="tagline">Available feeds to add to your collections</div>
        { this.state.feeds.map(function(feed){
            return <FeedThumb key={feed.id} feed={feed} />;
        })
      }</div>
  );
  }
});
