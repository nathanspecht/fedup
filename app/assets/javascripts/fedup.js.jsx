var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  componentDidMount: function() {
    ApiUtil.fetchFeeds();
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
    <Route path="articles/:title" component={ArticleShow} />
  </Route>
);

$(document).ready(function(){
  google.load("feeds", "1", { callback: function () {
    React.render(<Router>{ routes }</Router>, document.getElementById('content'));
  } });
});
