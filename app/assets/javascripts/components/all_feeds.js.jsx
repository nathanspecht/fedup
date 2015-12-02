AllFeeds = React.createClass({
  getInitialState: function() {
    return {topics: FeedStore.selectedTopics(), article: null, articleHidden: "hidden"};
  },
  updateFeeds: function() {
    this.setState({topics: FeedStore.selectedTopics()});
  },
  componentDidMount: function() {
    FeedStore.addChangeListener(this.updateFeeds);
  },
  componenetWillUnmount: function() {
    FeedStore.removeChangeListener(this.updateFeeds);
  },
  showArticle: function(article) {
    this.setState({articleHidden: "", article: article});
  },
  hideArticle: function() {
    this.setState({articleHidden: "hidden"});
  },
  render: function() {
    return (
      <div className="feed-index">
        <h1>Explore</h1>
        <div className="tagline">Available feeds to add to your collections</div>
        <FeedFilter />
        {
          Object.keys(this.state.topics).map(function(topic){
            return <TopicShow key={topic}
                              name={topic}
                              feeds={this.state.topics[topic]}
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
