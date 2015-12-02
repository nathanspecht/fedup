var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
window.Link = ReactRouter.Link;

var App = React.createClass({

  componentDidMount: function() {
    ApiUtil.fetchFeeds();
    ApiUtil.fetchSavedArticles();
    ApiUtil.fetchCollections();
    this.setState( function() { window.scrollTo(0, 0); } );
  },

  render: function() {
    return (
    <div className="app">
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
    <Route path="explore" component={AllFeeds} />
    <Route path="collections/:id" component={CollectionShow} />
    <Route path="search" component={SearchResultShow} />
  </Route>
);

function RenderApp () {
  React.render(<Router>{ routes }</Router>, document.getElementById('content'));
}
