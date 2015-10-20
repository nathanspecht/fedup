CollectionShow = React.createClass({

  getInitialState: function() {
    var collection = CollectionStore.find(this.props.params.id);
    var feeds = [];
    if (collection) {
      feeds = collection.feeds;
    }
    return { collection: collection || {}, feeds: feeds};
  },

  _collectionChange: function() {
    var collection = CollectionStore.find(this.props.params.id) || {};
    this.setState({ collection: collection,
                    feeds: collection.feeds || [] });
  },

  componentDidMount: function() {
    CollectionStore.addChangeListener(this._collectionChange);
    FeedStore.addChangeListener(this._collectionChange);
  },

  componenetWillUnmount: function() {
    CollectionStore.removeChangeListener(this._collectionChange);
    FeedStore.removeChangeListener(this._collectionChange);
  },

  componentWillReceiveProps: function(newProps) {
    var collection = CollectionStore.find(newProps.params.id);
    this.setState({collection: collection, feeds: collection.feeds});
  },

  render: function() {
    return (
      <div className="feedIndex">
        <h1>{this.state.collection.title}</h1>
        <div className="tagline">The most recent stories {this.state.collection.title}</div>
        { this.state.feeds.map(function(feed){
            return <FeedPreview key={feed.id} feed={feed} />;
        })
      }</div>
    );
  }
});
