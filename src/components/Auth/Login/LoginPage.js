import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';
import {Redirect} from 'react-router-dom';

export function LoginPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/api/dashboard" />;
    }
    return (
        <div className='container'>
            <h1>Login</h1>
            <LoginForm />
        </div>
    );
}
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});
export default connect(mapStateToProps)(LoginPage);
