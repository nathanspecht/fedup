ArticleThumb = React.createClass({
  // entry is a prop
  addImage: function() {
    var imageDiv = React.findDOMNode(this.refs.thumbImage);
    var imageSrc = $(this.props.entry.content).find('img').eq(0).attr('src');
    imageDiv.style.backgroundImage = "url(" + imageSrc + ")";
  },
  componentDidMount: function() {
    this.addImage();
  },
  render: function () {
    return (
      <div className="article-preview">
        <div ref="thumbImage" className="thumb-image"></div>
        <div className="thumb-text">
          <h4>{this.props.entry.title}</h4>
          <div className="snippet">{this.props.entry.contentSnippet}</div>
        </div>
      </div>
    );
  }
});
