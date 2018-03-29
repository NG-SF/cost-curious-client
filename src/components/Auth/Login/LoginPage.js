import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';

export function LoginPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    // if (props.loggedIn) {
    //     return <Redirect to="/dashboard" />;
    // }
    return (
        <div className='container'>
            <h1>Login</h1>
        <h3>not connected yet</h3>
            <LoginForm />
        </div>
    );
}


export default connect()(LoginPage);
