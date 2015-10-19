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

  render: function() {
    return (
      <div className="collection-select">
          { this.state.collections.map(function(collection){
            imgClass = FeedStore.collectionTitles(this.props.feed).indexOf(collection.title) === -1 ? "hidden" : "check-icon";
            return(
              <div className="collection-option"
                   key={collection.title}
                   onClick={this.addToCollection.bind(this, collection)}>
                {collection.title}
              <img className={imgClass} src="checkmark.png" />
              </div>
            );
          }.bind(this)) }
      </div>
    );
  }
});
