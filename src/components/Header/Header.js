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
    let logOutButton, link, register, login;
      if (this.props.loggedIn) {
          logOutButton = (
            <button className='btn-logout' onClick={() => this.logOut()}>Log out</button> );
          link = (<NavLink to={`/api/dashboard`} activeClassName='is-active'>Dashboard</NavLink>);
        } else { 
          register = (<NavLink to='/register' activeClassName='is-active' exact={true}>Sign up </NavLink>);
          login = (<NavLink to='/login' activeClassName='is-active' exact={true}>Login </NavLink>);
        }
    return (
      <nav>   
        <div className='nav-container'>
        <h1 className='titleName'>Cost Curious</h1>
          <ul>
            <li><NavLink to='/' activeClassName='is-active' exact={true}>Home</NavLink></li>
            <li>{login}</li>
            <li>{register}</li>
            <li>{link}</li> 
            <li> {logOutButton} </li>
          </ul>      
        </div>   
      </nav>
    );             
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Header);