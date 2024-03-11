import { Link } from "react-router-dom";

import './MainNavigation.css'

const MainNavigation = () => {
  return (
    <header className="navigation__header">
      <nav>
        <ul className="list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/ordercart">Order Cart</Link></li>
          <li><Link to="/authenticate">Authenticate</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </nav>
    </header>
    )
};

export default MainNavigation;