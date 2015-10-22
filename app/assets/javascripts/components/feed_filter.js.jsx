FeedFilter = React.createClass({
  getInitialState: function() {
    return {hidden: "hidden"};
  },
  _showForm: function() {
    this.setState({hidden: ""});
  },
  _hideForm: function() {
    this.setState({hidden: "hidden"});
  },
  render: function() {
    className = "filter-feeds-button";
    return (
      <div className={className}
           onMouseEnter={this._showForm}
           onMouseLeave={this._hideForm}>
        <span className="filter-feeds-text">
          Filter Feeds
        </span>
        <div className={this.state.hidden}>
          <TopicSelectList />
        </div>
     </div>
    );
  }
});
