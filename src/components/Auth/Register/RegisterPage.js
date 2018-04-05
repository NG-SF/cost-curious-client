import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import './Register.css';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/api/dashboard" />;
    }
    return (
        <div className="container register-form">
            <h2>Register</h2>
            <RegistrationForm />
            <p>Already registered?  <Link to="/login">Login</Link></p>
            
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
