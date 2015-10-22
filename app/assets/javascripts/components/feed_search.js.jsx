LinkedStateMixin = React.addons.LinkedStateMixin;

FeedSearch = React.createClass({
  mixins: [LinkedStateMixin, ReactRouter.History],
  
  getInitialState: function() {
    return {search: '', results: []};
  },

  updateResults: function() {
    var results = SearchStore.all();
    if (results[0]) {
      this.setState({results: results});
    } else {
      this.setState({results: []});
    }
  },

  componentDidMount: function() {
    SearchStore.addChangeListener(this.updateResults);
  },

  componenetWillUnmount: function() {
    SearchStore.removeChangeListener(this.updateResults);
  },

  search: function(e) {
    e.preventDefault();
    ApiUtil.searchFeeds(this.state.search);
    this.setState({hidden: ""});
    this.history.pushState(null, "search");
  },

  hideDropdown: function() {
    this.setState({hidden: "hidden", search: ''});
  },

  render: function() {
    return(
      <div className="search-area">
        <form onSubmit={this.search}>
          <input type="text"
                 placeholder="Search the web"
                 valueLink={this.linkState('search')}
                 onBlur={this.hideDropdown} />
        </form>
      </div>
    );
  }
});
