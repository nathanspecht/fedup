TopicShow = React.createClass({
  render: function(){
    return (
        <div className="feed-thumbs">
          {
              this.props.feeds.map(function(feed){
              return <FeedThumb key={feed.id} feed={feed} />;
            })
          }
        </div>
    );
  }
});
