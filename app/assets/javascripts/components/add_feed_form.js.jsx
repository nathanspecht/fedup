LinkedStateMixin = React.addons.LinkedStateMixin;

AddFeedForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return { collection: "", collections: CollectionStore.all() };
  },

  _updateCollections: function() {
    this.setState({collections: CollectionStore.all()});
  },

  componentDidMount: function() {
    CollectionStore.addChangeListener(this._updateCollections);
  },

  componentWillUnmount: function() {
    CollectionStore.removeChangeListener(this._updateCollections);
  },

  addToCollection: function(collection) {
    ApiUtil.addFeedToCollection(this.props.feed, collection);
  },

  removeFromCollection: function(collection) {
    ApiUtil.removeFeedFromCollection(this.props.feed, collection);
  },

  _showButton: function() {

  },

  render: function() {
    return (
      <div className="collection-select">
          { this.state.collections.map(function(collection){
            if (CollectionStore.feedUrls(collection).indexOf(this.props.feed.url) === -1) {
              imgClass = "hidden";
              clickAction = this.addToCollection.bind(this, collection);
            } else {
              imgClass = "check-icon";
              clickAction = this.removeFromCollection.bind(this, collection);
            }
            return(
              <div className="collection-option"
                   key={collection.title}
                   onClick={clickAction}>
                {collection.title}
              <img className={imgClass} src="checkmark.png" />
              </div>
            );
          }.bind(this)) }
          <div className="collection-option no-hover">
            <NewCollectionForm _showButton={this._showButton}
                               focus=""
                               feed={this.props.feed}/>
          </div>
      </div>
    );
  }
});
