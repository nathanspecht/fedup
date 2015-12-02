FeedIndex = React.createClass({

  getInitialState: function() {
    return { feeds: CollectionStore.collectedFeeds(), articleHidden: "hidden", article: null };
  },

  _collectionChange: function() {
    this.setState({ feeds: CollectionStore.collectedFeeds() });
  },

  componentDidMount: function() {
    CollectionStore.addChangeListener(this._collectionChange);
  },

  componenetWillUnmount: function() {
    CollectionStore.removeChangeListener(this._collectionChange);
  },
  showArticle: function(article) {
    document.getElementById("body").className = "no-scroll";
    this.setState({articleHidden: "", article: article});
  },
  hideArticle: function() {
    document.getElementById("body").className = "";
    this.setState({articleHidden: "hidden"});
  },
  render: function() {
    return (
      <div className="feedIndex">
        <h1>Today</h1>
        <div className="tagline">The most recent stories in your fedup today</div>
        { this.state.feeds.map(function(feed){
            return <FeedPreview key={feed.id}
                                feed={feed}
                                showArticle={this.showArticle} />;
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
