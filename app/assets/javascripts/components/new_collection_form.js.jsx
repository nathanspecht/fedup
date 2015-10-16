LinkedStateMixin = React.addons.LinkedStateMixin;

NewCollectionForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return { title: "" };
  },

  _addCollection: function() {
    ApiUtil.saveCollection(this.state);
    this.props._showButton();
  },

  render: function() {
    return (
      <form>
        <label>
          <input type="text" valueLink={this.linkState('title')} />
        </label>
        <button className="button submit-button"
                onClick={this._addCollection}>Create</button>
      </form>
    );
  }
});
