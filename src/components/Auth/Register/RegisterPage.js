import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import Spinner from 'react-spinkit';
import './Register.css';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/api/dashboard" />;
    }
    if (props.loading) {
        return <Spinner name="circle" color="green"/>;
    }

    return (
        <div className="register-form-wrapper">
            <h1>Sign up</h1>
            <RegistrationForm />
            <h2>Already registered?  <Link to="/login">Login</Link></h2>       
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    loading: state.auth.loading
});

export default connect(mapStateToProps)(RegistrationPage);
