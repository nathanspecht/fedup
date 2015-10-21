AllFeeds = React.createClass({
  getInitialState: function() {
    return {topics: FeedStore.topics()};
  },
  updateFeeds: function() {
    this.setState({topics: FeedStore.topics()});
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
        {
          Object.keys(this.state.topics).map(function(topic){
            return <TopicShow key={topic} name={topic} feeds={this.state.topics[topic]} />;
          }.bind(this))
        }
      </div>
    );
  }
});
