import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className='notFound'>
    <h3>The page you are trying to access does not exist or you need to be logged in to view it.</h3> 
    <Link to='/'>Go to Home Page</Link>
    <Link to='/login'>Login</Link>
  </div>
);

export default NotFoundPage;