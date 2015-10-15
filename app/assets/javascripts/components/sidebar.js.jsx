Sidebar = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function() {
    return { feeds: FeedStore.all(),
             hidden: "hidden",
             style: "sidebar compact",
             expandIcon: "expand-icon"};
  },

  goHome: function() {
    this.history.pushState(null, "/");
  },

  goSaved: function() {
    this.history.pushState(null, "/saved");
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

  logoutUser: function() {
    ApiUtil.logout();
  },

  showSidebar: function() {
    this.setState({ hidden: "",
                    style: "sidebar full",
                    expandIcon: "expand-icon hidden"});
  },

  hideSidebar: function() {
    this.setState({ hidden: "hidden",
                    style: "sidebar compact",
                    expandIcon: "expand-icon"});
  },

  render: function(){
    return (
      <div className={this.state.style}
           onMouseEnter={this.showSidebar}
           onMouseLeave={this.hideSidebar}>
        <div className={this.state.expandIcon}>
          <div className="expand-bar"></div>
          <div className="expand-bar"></div>
          <div className="expand-bar"></div>
        </div>
        <div className={this.state.hidden}>
            <ul className="nav-menu">
              <li onClick={this.goHome}>Today</li>
              <li onClick={this.goSaved}>Saved For Later</li>
            </ul>
            <FeedNavList feeds = {this.state.feeds}/>
            <div className="user-options">
              <div className="username">{window.CURRENT_USER.username}</div>
              <button className="button"
                      onClick={this.logoutUser}>Logout</button>
            </div>
          </div>
      </div>
    );
  }
});
