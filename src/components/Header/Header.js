import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <nav>
   <ul>
     <li><NavLink to='/' activeClassName='is-active' exact={true}>Home</NavLink></li>
     <li><NavLink to='/register' activeClassName='is-active' exact={true}>Register</NavLink></li>
     <li><NavLink to='/login' activeClassName='is-active' exact={true}>Login</NavLink></li>
     <li><NavLink to='/api/dashboard' activeClassName='is-active'>Dashboard</NavLink></li>
     <li>Log Out</li>
   </ul>
  </nav>
);

export default Header;