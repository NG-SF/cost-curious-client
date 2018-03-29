import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../components/App/App';
import Header from '../components/Header/Header';
import Dashboard from '../components/Dashboard/Dashboard';
import AddItem from '../components/AddItem/AddItem';
import EditItem from '../components/EditItem/EditItem';
import ItemPage from '../components/ItemPage/ItemPage';
import NotFound from '../components/NotFound/NotFound';
import RegisterPage from '../components/Auth/Register/RegisterPage';
import LoginPage from '../components/Auth/Login/LoginPage';

const AppRouter = () => (
  <BrowserRouter>
  <div>
    <Header />
    <Switch>
      <Route path='/' component={App} exact={true} />
      <Route path='/#about' component={App} exact={true} />
      <Route path='/api/dashboard' component={Dashboard} />
      <Route path="/api/create/:id" component={AddItem} />
      <Route path="/api/edit/:itemId/:id" component={EditItem} />
      <Route path="/api/:id" component={ItemPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route component={NotFound} />      
    </Switch>
  </div>
  </BrowserRouter>
);
export default AppRouter;