Sidebar = React.createClass({
  render: function(){
    return (
      <div className="sidebar">
        <ul className="nav-menu">
          <li>Today</li>
          <li>Saved For Later</li>
        </ul>
        <div className="button">Logout</div>
      </div>
    );
  }
});
