import React, { memo } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Search from "./Search";
import { StoreConsumer } from '../../contexts';

const Navbar = memo(() => {


  return (

    <StoreConsumer>

      {ctx => (

        <nav className="nav-bar">

          <NavLink exact to="/" className="nav-item" activeClassName="active">
            <i className="fab fa-reddit-alien" />
            Home
          </NavLink>

          <NavLink to="/favorites" className="nav-item" activeClassName="active">
            <i className="fas fa-heart" />
            Favorites ({ ctx.favorited })
          </NavLink>

          <Search />
        </nav>
      
      )}
  
    </StoreConsumer>
  ); 
})

export default withRouter(Navbar)