import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import RegisterForm from './RegisterForm';

export function RegisterPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    // if (props.loggedIn) {
    //     return <Redirect to="/dashboard" />;
    // }
    return (
        <div className='container'>
            <h1>Register</h1>
            <h3>not connected yet</h3>
            <RegisterForm />
            <Link to="/login">Login</Link>
        </div>
    );
}

// const mapStateToProps = state => ({
//     loggedIn: state.auth.currentUser !== null
// });

export default connect()(RegisterPage);
