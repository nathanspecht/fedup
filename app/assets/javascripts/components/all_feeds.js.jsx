AllFeeds = React.createClass({
  getInitialState: function() {
    return {topics: FeedStore.selectedTopics()};
  },
  updateFeeds: function() {
    this.setState({topics: FeedStore.selectedTopics()});
  },
  componentDidMount: function() {
    FeedStore.addChangeListener(this.updateFeeds);
  },
  componenetWillUnmount: function() {
    FeedStore.removeChangeListener(this.updateFeeds);
  },
  render: function() {
    return (
      <div className="feed-index">
        <h1>Explore</h1>
        <div className="tagline">Available feeds to add to your collections</div>
        <FeedFilter />
        {
          Object.keys(this.state.topics).map(function(topic){
            return <TopicShow key={topic} name={topic} feeds={this.state.topics[topic]} />;
          }.bind(this))
        }
      </div>
    );
  }
});
