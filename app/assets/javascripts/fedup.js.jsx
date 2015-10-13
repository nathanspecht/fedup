var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function() {
    return (
        <div>
          <header>
            <h1>Fedup</h1>
          </header>
          { this.props.children }
        </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={FeedIndex} />
  </Route>
);

$(document).ready(function(){
  google.load("feeds", "1", { callback: function () {
    React.render(<Router>{ routes }</Router>, document.getElementById('content'));
  } });
});
