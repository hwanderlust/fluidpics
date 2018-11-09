import React, { memo } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Search from "./Search";

const Navbar = memo(() => {


  return <nav className="nav-bar">
      <NavLink exact to="/" className="nav-item" activeClassName="active">
        <i className="fab fa-reddit-alien" />
        Home
      </NavLink>

      <NavLink to="/favorites" className="nav-item" activeClassName="active">
        <i className="fas fa-heart" />
        Favorites
      </NavLink>

      <Search />
    </nav>; 
})

export default withRouter(Navbar)