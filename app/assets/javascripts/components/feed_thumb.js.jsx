FeedThumb = React.createClass({
  loadFeed: function () {
    var rssfeed = new google.feeds.Feed(this.props.feed.url);
    rssfeed.load(function(result){
        var thumbText = React.findDOMNode(this.refs.thumbText);
        var thumbImage = React.findDOMNode(this.refs.thumbImage);

        var imageSrc =
          $(result.feed.entries[0].content).find('img').eq(0).attr('src');
        thumbImage.style.backgroundImage = "url(" + imageSrc + ")";
        thumbImage.className = "thumbnail";

        var snippet = document.createElement("snippet");
        var title = document.createElement("h4");

        title.innerHTML = result.feed.entries[0].title;
        snippet.innerHTML = result.feed.entries[0].contentSnippet;
        snippet.className = "snippet";

        thumbText.appendChild(title);
        thumbText.appendChild(snippet);
    }.bind(this));
  },

  componentDidMount: function() {
    this.loadFeed();
  },

  render: function () {
    return (
      <div className="articlePreview">
        <h3>{this.props.feed.title}</h3>
        <div ref="thumbImage"></div>
        <div ref="thumbText">
        </div>
      </div>
    );
  }
});
