FeedThumb = React.createClass({
  getInitialState: function(){
    return { entries: [] };
  },

  loadFeeds: function () {
    var rssfeed = new google.feeds.Feed(this.props.feed.url);
    rssfeed.load(function(result){
      this.setState({ entries: result.feed.entries });
    }.bind(this));
  },

  componentDidMount: function() {
    this.loadFeeds();
  },

  render: function () {
    return (
      <div className="feed-preview">
        <h3>{this.props.feed.title}</h3>
        {
          this.state.entries.slice(0, 2).map(function(entry){
            return <ArticleThumb entry={entry} />;
          })
        }
      </div>
    );
  }
});
