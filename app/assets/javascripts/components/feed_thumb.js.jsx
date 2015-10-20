FeedThumb = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function(){
    return { firstArticle: {} };
  },

  _articlesUpdated: function() {
    var firstArticle = ArticleStore.findByFeed(this.props.feed)[0] || {};
    this.setState({firstArticle: firstArticle});
    this.addImage();
  },

  componentDidMount: function(){
    ArticleStore.addChangeListener(this._articlesUpdated);
    ApiUtil.fetchArticles(this.props.feed);
    this.addImage();
  },

  componentWillUnmount: function(){
    ArticleStore.removeChangeListener(this._articlesUpdated);
  },

  addImage: function() {
    var imageDiv = React.findDOMNode(this.refs.thumbImage);
    var imageSrc = $(this.state.firstArticle.content).find('img').eq(0).attr('src');
    if (imageSrc) {
      imageDiv.style.backgroundImage = "url(" + imageSrc + ")";
    }
  },

  _linkToArticle: function() {
    this.history.pushState(null, "articles/" + this.props.feed.id + "/" + this.state.firstArticle.title);
  },

  _linkToFeed: function() {
    this.history.pushState(null, "feeds/" + this.props.feed.id);
  },

  render: function() {
    return(
      <div className="feed-thumb">
        <div className="square"></div>
        <h2 onClick={this._linkToFeed}>{this.props.feed.title}</h2>
        <AddToCollectionButton feed={this.props.feed}/>
        <div className="thumb-image-snippet"
             onClick={this._linkToArticle}>
          <div ref="thumbImage" className="thumb-image"></div>
          <div className="feed-preview-snippet">
            <p>
              {this.state.firstArticle.contentSnippet}
            </p>
          </div>
        </div>
      </div>
    );
  }
});
