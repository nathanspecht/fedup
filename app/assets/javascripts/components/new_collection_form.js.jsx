LinkedStateMixin = React.addons.LinkedStateMixin;

NewCollectionForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return { title: "" };
  },

  _addCollection: function(e) {
    e.preventDefault();
    if (this.props.feed) {
      ApiUtil.saveCollectionAndFeed(this.state, this.props.feed);
    } else {
      ApiUtil.saveCollection(this.state);
    }
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
    if (this.props.focus) {
      textInput.focus();
    }
  },

  render: function() {
    var placeholder = this.props.focus ? "" : "Type here to create a new collection";
    return (
      <div className={this.props.hidden}>
        <form onSubmit={this._addCollection}>
          <input type="text"
                 placeholder={placeholder}
                 valueLink={this.linkState('title')}
                 onKeyDown={this._handleKeyDown}
                 onBlur={this.props._showButton}
                 ref="textInput" />
        </form>
      </div>
    );
  }
});
