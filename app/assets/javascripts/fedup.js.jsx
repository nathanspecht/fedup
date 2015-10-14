var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function() {
    return (
        <div>
          { this.props.children }
        </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={FeedIndex} />
    <Route path="feeds/:id" component={FeedShow} />
  </Route>
);

$(document).ready(function(){
  google.load("feeds", "1", { callback: function () {
    React.render(<Router>{ routes }</Router>, document.getElementById('content'));
  } });
});
