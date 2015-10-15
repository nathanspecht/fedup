FeedNavList = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function() {
    return { hidden: "hidden", caret: "right-caret.png" };
  },

  toggleList: function() {
    if (this.state.hidden === "hidden") {
      this.setState({ hidden: "", caret: "down-caret.png" });
    } else {
      this.setState({ hidden: "hidden", caret: "right-caret.png" });
    }
  },

  feedLink: function(id) {
    var url = "feeds/" + id;
    this.history.pushState(null, url);
  },

  render: function(){
      return (
        <div className="nav-menu feeds">
          <img className="icon"
               src={this.state.caret}
               onClick={this.toggleList}/>
          <h5 onClick={this.toggleList}>All</h5>
          <ul className={this.state.hidden}>
            {this.props.feeds.map(function(feed){
              return (
                <li key={feed.id}
                    onClick={this.feedLink.bind(this, feed.id)}>
                  {feed.title}
                </li>
              );
            }.bind(this))}
          </ul>
        </div>
      );
  }
});
