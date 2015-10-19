AddToCollectionButton = React.createClass({
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
    className = "add-to-collection-button";
    return (
      <div className={className}
           onMouseEnter={this._showForm}
           onMouseLeave={this._hideForm}>
        <span>
          Add to Collection
        </span>
        <div className={this.state.hidden}>
          <AddFeedForm feed={this.props.feed}/>
        </div>
     </div>
    );
  }
});
