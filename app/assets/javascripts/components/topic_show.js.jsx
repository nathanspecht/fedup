TopicShow = React.createClass({
  render: function(){
    return (
      <div className="topic-show">
        <h2>{this.props.name}</h2>
        {
            this.props.feeds.map(function(feed){
            return <FeedThumb key={feed.id} feed={feed} />;
          })
        }
      </div>
    );
  }
});
