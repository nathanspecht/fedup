var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
window.Link = ReactRouter.Link;

var App = React.createClass({
  componentDidMount: function() {
    ApiUtil.fetchFeeds();
    ApiUtil.fetchSavedArticles();
    ApiUtil.fetchCollections();
  },

  render: function() {
    return (
      <div>
        <Sidebar />
        <div className="page">
          { this.props.children }
        </div>
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={FeedIndex} />
    <Route path="feeds/:id" component={FeedShow} />
    <Route path="saved" component={SavedArticleIndex} />
    <Route path="articles/:feed_id/:title" component={ArticleShow} />
    <Route path="all_feeds" component={AllFeeds} />
  </Route>
);

function RenderApp () {
  google.load("feeds", "1", { callback: function () {
    React.render(<Router>{ routes }</Router>, document.getElementById('content'));
  } });
}
