SearchResultShow = React.createClass({
  getInitialState: function() {
    return {feeds: SearchStore.all(), feed: null};
  },
  updateFeeds: function() {
    this.setState({feeds: SearchStore.all()});
  },
  componentDidMount: function() {
    SearchStore.addChangeListener(this.updateFeeds);
  },
  componenetWillUnmount: function() {
    SearchStore.removeChangeListener(this.updateFeeds);
  },
  render: function() {
    return (
      <div className="feed-index">
        <FeedSearch />
        <h1>Explore</h1>
        <div className="tagline">Available feeds to add to your collections</div>
        <ul className="search-result-list">
          {
            this.state.feeds.map(function(feed, idx){
              return <FeedSearchItem key={feed.title + idx} feed={feed} />;
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});
