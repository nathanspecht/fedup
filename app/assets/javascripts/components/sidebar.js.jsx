Sidebar = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function() {
    return { feeds: FeedStore.all() };
  },

  goHome: function() {
    this.history.pushState(null, "/");
  },

  feedLink: function(id) {
    var url = "feeds/" + id;
    this.history.pushState(null, url);
  },

  _feedChange: function() {
    this.setState({feeds: FeedStore.all()});
  },

  componentDidMount: function() {
    FeedStore.addChangeListener(this._feedChange);
  },

  componenetWillUnmount: function() {
    FeedStore.removeChangeListener(this._feedChange);
  },

  render: function(){
    return (
      <div className="sidebar">
        <ul className="nav-menu">
          <li onClick={this.goHome}>Today</li>
          <li>Saved For Later</li>
        </ul>
        <ul className="nav-menu feeds">
          {this.state.feeds.map(function(feed){
            return (
              <li onClick={this.feedLink.bind(this, feed.id)}>
                {feed.title}
              </li>
            );
          }.bind(this))}
        </ul>
        <button className="logout-button">Logout</button>
      </div>
    );
  }
});
