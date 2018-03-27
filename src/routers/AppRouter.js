import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../components/App/App';
import Header from '../components/Header/Header';
import Dashboard from '../components/Dashboard/Dashboard';
import AddItem from '../components/AddItem/AddItem';
import ItemPage from '../components/ItemPage/ItemPage';
import NotFound from '../components/NotFound/NotFound';


const AppRouter = () => (
  <BrowserRouter>
  <div>
    <Header />
    <Switch>
      <Route path='/' component={App} exact={true} />
      <Route path='/api/dashboard' component={Dashboard} />
      <Route path="/api/create" component={AddItem} />
      <Route path="/api/:id" component={ItemPage} />
      <Route component={NotFound} />      
    </Switch>
  </div>
  </BrowserRouter>
);
export default AppRouter;