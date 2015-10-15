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
                <Link key={feed.id} to={"feeds/" + feed.id}>{feed.title}</Link>
              );
            }.bind(this))}
          </ul>
        </div>
      );
  }
});
