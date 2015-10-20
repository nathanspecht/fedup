Sidebar = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function() {
    return { feeds: CollectionStore.collectedFeeds(),
             collections: CollectionStore.all(),
             hidden: "hidden",
             style: "sidebar compact",
             expandIcon: "expand-icon"};
  },

  _feedChange: function() {
    this.setState({feeds: CollectionStore.collectedFeeds()});
  },

  _collectionChange: function() {
    this.setState({collections: CollectionStore.all(),
                   feeds: CollectionStore.collectedFeeds()});
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
    this.setState({ hidden: "sidebar-content unhidden",
                    style: "sidebar full",
                    expandIcon: "expand-icon hidden"});
  },

  hideSidebar: function() {
    this.setState({ hidden: "sidebar-content hidden",
                    style: "sidebar compact",
                    expandIcon: "expand-icon"});
  },
  _showAllFeeds: function() {
    this.history.pushState(null, '/all_feeds');
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
              <Link to="/">Most Recent</Link>
              <Link to="/saved">Saved</Link>
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
                                 feeds={collec.feeds || []}
                                 title={collec.title} />
                    </div>
                  );
                })
              }
            </ul>
            <CategoryOptions />
            <button className="button"
                    onClick={this._showAllFeeds}>
                    Add Content
            </button>
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
