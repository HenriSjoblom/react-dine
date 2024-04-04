import { Link } from "react-router-dom";
import { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';

import './MainNavigation.css'

const MainNavigation = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="navi-container">
      <header className="navigation__header">
        <nav>
          <ul className="list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/ordercart">Order Cart</Link></li>
            { auth.isLoggedIn && (
              <li>
                <Link to="/users">Users</Link>
              </li>
            )}
            { auth.isLoggedIn && (
              <li>
                <Link to="/dines/new">Add Dine</Link>
              </li>
            )}
            { !auth.isLoggedIn && (
              <li>
                <Link to="/auth">Login / Sign Up</Link>
              </li>
            )}
            { auth.isLoggedIn && (
              <li>
                <button onClick={auth.logout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
    )
};

export default MainNavigation;