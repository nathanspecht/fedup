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
      <div className="feedIndex">{
        this.state.feeds.map(function(feed){
          return <FeedThumb key={feed.id} feed={feed} />;
        })
      }</div>
    );
  }
});
