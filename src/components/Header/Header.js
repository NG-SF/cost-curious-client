import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';
import { NavLink } from 'react-router-dom';
import './Header.css';

export class Header extends React.Component {
  logOut() {
      this.props.dispatch(clearAuth());
      clearAuthToken();

    }

  render() {
  // Only render the log out button if we are logged in
    let logOutButton, link, register;
      if (this.props.loggedIn) {
          logOutButton = (
            <button onClick={() => this.logOut()}>Log out</button> );
          link = (<NavLink to={`/api/dashboard`} activeClassName='is-active'>Dashboard</NavLink>);
        } else { 
          register = (<NavLink to='/register' activeClassName='is-active' exact={true}>Register / Login</NavLink>);
        }
    return (
      <nav>
        <ul>
          <li><NavLink to='/' activeClassName='is-active' exact={true}>Home</NavLink></li>
          <li><NavLink to='/about' activeClassName='is-active' exact={true}>About</NavLink></li>
          <li>{register}</li>
          <li>{link}</li> 
          <li> {logOutButton} </li>
        </ul>
      </nav>
    );             
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Header);