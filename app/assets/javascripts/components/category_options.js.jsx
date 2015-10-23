CategoryOptions = React.createClass ({
  getInitialState: function() {
    return {hidden: "hidden", buttonDisplay: "button"};
  },
  _showForm: function() {
    this.setState({hidden: "", buttonDisplay: "hidden"});
  },
  _showButton: function() {
    this.setState({hidden: "hidden", buttonDisplay: "button"});
  },
  render: function() {
    return (
      <div className="category-options">
        <button className={this.state.buttonDisplay}
                onClick={this._showForm}>
                New Collection
        </button>
        <NewCollectionForm _showButton={this._showButton} hidden={this.state.hidden} focus="true"/>
      </div>
    );
  }
}
);
