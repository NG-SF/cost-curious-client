import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';
import {Redirect} from 'react-router-dom';
import Spinner from 'react-spinkit';
import './Login.css';

export function LoginPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/api/dashboard" />;
    }

    return (
            <div className='login-form-wrapper'>

            {props.loading && <Spinner name="circle" color="green"/>}

                <h1>Welcome</h1>
                <LoginForm />
                <div className='demo-box'>
                    <h2 className='demo'>Demo account:</h2>
                    <p className='demo'>username - demo</p>
                    <p className='demo'>password - demo123</p>
                </div>
        </div>
    );
}
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    loading: state.auth.loading

});
export default connect(mapStateToProps)(LoginPage);
