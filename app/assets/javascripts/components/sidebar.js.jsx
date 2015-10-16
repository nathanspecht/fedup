Sidebar = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function() {
    return { feeds: FeedStore.all(),
             collections: CollectionStore.all(),
             hidden: "hidden",
             style: "sidebar compact",
             expandIcon: "expand-icon"};
  },

  _feedChange: function() {
    this.setState({feeds: FeedStore.all()});
  },

  _collectionChange: function() {
    this.setState({collections: CollectionStore.all()});
  },

  componentDidMount: function() {
    FeedStore.addChangeListener(this._feedChange);
    CollectionStore.addChangeListener(this._collectionChange);
  },

  componenetWillUnmount: function() {
    FeedStore.removeChangeListener(this._feedChange);
    CollectionStore.removeChangeListener(this._collectionChange);
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
              <Link to="/">Today</Link>
              <Link to="/saved">Saved For Later</Link>
            </ul>
            <ul className="category-nav">
              <div className="category-li">
                <FeedNavList feeds={this.state.feeds} title="All"/>
              </div>
              {
                this.state.collections.map(function(collec, i) {
                  return(
                    <div className="category-li" key={i}>
                    <FeedNavList key={collec.id}
                                 feeds={collec.feeds}
                                 title={collec.title} />
                    </div>
                  );
                })
              }
            </ul>
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
