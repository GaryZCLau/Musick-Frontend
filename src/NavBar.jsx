import React from 'react';
import {NavLink} from 'react-router-dom'

const NavBar = () => {
  return(
    <ul className="nav">
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      {/* <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li> */}
      <li>
        <NavLink to="/profile">Profle</NavLink>
      </li>
    </ul>
  )
};

export default NavBar;