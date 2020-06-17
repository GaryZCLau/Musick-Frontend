import React from 'react';
import {NavLink} from 'react-router-dom'

const NavBar = () => {

  const link = {
    // width: '100px',
    // padding: '12px',
    margin: '0 6px 6px',
    // background: 'darkgray',
    textDecoration: 'none',
    color: 'white'
  }

  return(
    <ul className="nav">
      <li className="navli">
        <NavLink to="/home" style={link} activeStyle={{color: 'yellow'}}>Home</NavLink>
      </li>
      <li className="navli">
        <NavLink to="/game" style={link} activeStyle={{color: 'yellow'}}>Game</NavLink>
      </li>
      <li className="navli">
        <NavLink to="/profile" style={link} activeStyle={{color: 'yellow'}}>Profile</NavLink>
      </li>
    </ul>
  )
};

export default NavBar;