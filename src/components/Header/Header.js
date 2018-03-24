import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav>
   <ul>
     <li><NavLink to='/' activeClassName='is-active' exact={true}>Home</NavLink></li>
     <li>Register / Login</li>
     <li><NavLink to='/dashboard' activeClassName='is-active'>Dashboard</NavLink></li>
     <li><NavLink to='/create' activeClassName='is-active'>Add new item</NavLink></li>
     <li>Log Out</li>
   </ul>
  </nav>
);

export default Header;