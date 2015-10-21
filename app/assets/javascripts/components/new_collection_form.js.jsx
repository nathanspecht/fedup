LinkedStateMixin = React.addons.LinkedStateMixin;

NewCollectionForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return { title: "" };
  },

  _addCollection: function(e) {
    e.preventDefault();
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

  componentDidUpdate: function() {
    var textInput = React.findDOMNode(this.refs.textInput);
    textInput.focus();
  },

  render: function() {
    return (
      <div className={this.props.hidden}>
        <form onSubmit={this._addCollection}>
          <input type="text"
                 valueLink={this.linkState('title')}
                 onKeyDown={this._handleKeyDown}
                 onMouseLeave={this.props._showButton}
                 ref="textInput" />
        </form>
      </div>
    );
  }
});
