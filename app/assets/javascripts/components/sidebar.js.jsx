Sidebar = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function() {
    return { feeds: CollectionStore.collectedFeeds(),
             collections: CollectionStore.all(),
             hidden: "hidden",
             style: "compact",
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
    this.setState({ hidden: "unhidden",
                    style: "full",
                    expandIcon: "expand-icon hidden"});
  },

  hideSidebar: function() {
    this.setState({ hidden: "hidden",
                    style: "compact",
                    expandIcon: "expand-icon"});
  },
  _showAllFeeds: function() {
    this.hideSidebar();
    this.history.pushState(null, '/explore');
  },
  render: function(){
    return (
      <div className={"sidebar " + this.state.style}
           onMouseEnter={this.showSidebar}
           onMouseLeave={this.hideSidebar}>
        <div className={this.state.expandIcon}>
          <div className="expand-bar"></div>
          <div className="expand-bar"></div>
          <div className="expand-bar"></div>
        </div>
        <div className={"sidebar-content " + this.state.hidden}>
            <ul className="nav-menu">
              <Link to="/" onClick={this.hideSidebar}>Most Recent</Link>
              <Link to="/saved" onClick={this.hideSidebar}>Saved</Link>
            </ul>
            <ul className="category-nav">
              {
                this.state.collections.map(function(collec, i) {
                  return(
                    <div className="category-li" key={i}>
                    <FeedNavList key={collec.id}
                                 feeds={collec.feeds || []}
                                 title={collec.title}
                                 id={collec.id}
                                 hideSidebar = {this.hideSidebar}/>
                    </div>
                  );
                }.bind(this))
              }
            </ul>
            <CategoryOptions />
            <button className="button"
                    onClick={this._showAllFeeds}>
                    Add to Collections
            </button>
          <div className={"user-options " + this.state.hidden}>
            <div className="username">{window.CURRENT_USER.username}</div>
            <button className="button"
                    onClick={this.logoutUser}>Logout</button>
          </div>
          </div>
      </div>
    );
  }
});
