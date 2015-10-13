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
  <Route path="/" component={ App }>
  </Route>
);

$(document).ready(function(){
  React.render(<Router>{ routes }</Router>, document.getElementById('content'));
});
