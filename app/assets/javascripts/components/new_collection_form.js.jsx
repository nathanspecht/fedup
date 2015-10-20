LinkedStateMixin = React.addons.LinkedStateMixin;

NewCollectionForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return { title: "" };
  },

  _addCollection: function() {
    ApiUtil.saveCollection(this.state);
    this.props._showButton();
    this.setState({title: ""});
  },

  _handleKeyDown: function(e) {
    if (e.key === "Escape") {
      this.props._showButton();
      this.setState({title: ""});
    }
  },

  prevent: function (e) {
    e.preventDefault();
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.prevent}>
          <label>
            <input type="text"
                   valueLink={this.linkState('title')}
                   onKeyDown={this._handleKeyDown} />
          </label>
          <button className="hidden"
                  onClick={this._addCollection}>Create</button>
        </form>
        <div className="tagline">
          Press enter to add or escape to cancel.
        </div>
      </div>
    );
  }
});
