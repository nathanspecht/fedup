CollectionShow = React.createClass({

  getInitialState: function() {
    var collection = CollectionStore.find(this.props.params.id);
    var feeds = [];
    if (collection) {
      feeds = collection.feeds;
    }
    return { collection: collection || {},
             feeds: feeds,
             article: null,
             articleHidden: "hidden"};
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
  showArticle: function(article) {
    this.setState({articleHidden: "", article: article});
  },
  hideArticle: function() {
    this.setState({articleHidden: "hidden"});
  },

  render: function() {
    return (
      <div className="feedIndex">
        <h1>{this.state.collection.title}</h1>
        <div className="tagline">The most recent stories {this.state.collection.title}</div>
        { this.state.feeds.map(function(feed){
            return <FeedPreview key={feed.id} feed={feed} showArticle={this.showArticle}/>;
        }.bind(this))
        }
        {
          <div className={"article-mod " + this.state.articleHidden}
               onClick={this.hideArticle}>
            <ArticleShow article={this.state.article} />
          </div>
        }
    </div>
    );
  }
});
