import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../components/App/App';
import Header from '../components/Header/Header';
import About from '../components/About/About';
import Dashboard from '../components/Dashboard/Dashboard';
import AddItem from '../components/AddItem/AddItem';
import EditItem from '../components/EditItem/EditItem';
import ItemPage from '../components/ItemPage/ItemPage';
import NotFound from '../components/NotFound/NotFound';
import RegisterPage from '../components/Auth/Register/RegisterPage';
import LoginPage from '../components/Auth/Login/LoginPage';

const AppRouter = () => (
  <BrowserRouter>
  <main id='main'>
    <Header />
    <Switch>
      <Route path='/' component={App} exact={true} />
      <Route path='/about' component={About} exact={true} />
      <Route path='/api/dashboard' component={Dashboard} />
      <Route path="/api/create/:dataId" component={AddItem} />
      <Route path="/api/edit/:dataId/:itemId" component={EditItem} />
      <Route path="/api/:dataId" component={ItemPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route component={NotFound} />      
    </Switch>
  </main>
  </BrowserRouter>
);
export default AppRouter;