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
    ApiUtil.fetchFirstArticle(this.props.feed);
    this.addImage();
  },

  componentWillUnmount: function(){
    ArticleStore.removeChangeListener(this._articlesUpdated);
  },

  addImage: function() {
    var imageDiv = React.findDOMNode(this.refs.thumbImage);
    var imageSrc = $("<div>" + this.state.firstArticle.content + "</div>").find('img').eq(0).attr('src') ||
                   $("<div>" + this.state.firstArticle.content + "</div>").filter('img').eq(0).attr('src');
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
        <h2 onClick={this._linkToFeed}>{ApiUtil.stripHTML(this.props.feed.title)}</h2>
        <h3 className="h3">#{this.props.feed.topic}</h3>
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
