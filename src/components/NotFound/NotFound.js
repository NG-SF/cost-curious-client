import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h3>This page does not exist.</h3> 
    <Link to='/'>Go to Home Page</Link>
  </div>
);

export default NotFoundPage;