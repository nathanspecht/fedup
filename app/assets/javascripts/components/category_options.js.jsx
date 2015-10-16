CategoryOptions = React.createClass ({
  getInitialState: function() {
    return {formDisplay: "hidden", buttonDisplay: "button"};
  },
  _showForm: function() {
    this.setState({formDisplay: "form", buttonDisplay: "hidden"});
  },
  _showButton: function() {
    this.setState({formDisplay: "hidden", buttonDisplay: "button"});
  },
  render: function() {
    return (
      <div className="category-options">
        <button className={this.state.buttonDisplay}
                onClick={this._showForm}>
                New Collection
        </button>
        <div className={this.state.formDisplay}>
          <NewCollectionForm _showButton={this._showButton}/>  
        </div>
      </div>
    );
  }
}
);
