import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/store';

import App from './components/app';
import Auth from './components/AuthComponent/auth';
import Foods from './components/FoodComponent/foods';
import Register from './components/RegisterComponent/register';
import Login from './components/LoginComponent/login';
import User from './components/UserComponent/user';
import Accounts from './components/AccountsComponent/accounts';
import Photo from './components/AccountsComponent/PhotoComponent/photo';
import Edit from './components/AccountsComponent/EditComponent/edit';
import Password from './components/AccountsComponent/PasswordComponent/password';
import NotFound from './components/NotFoundComponent/notfound';
import requireAuthentication from './components/AuthenticateComponent/authenticate';

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Foods} />
        <Route path="/photo/:uuid" component={Foods} />
        <Route component={Auth}>
          <Route path="/register" name="register" component={Register}/>
          <Route path="/login" name="login" component={Login}/>
        </Route>
        <Route path="/profile/:name" name="user" component={requireAuthentication(User)}/>
        <Route path="/user/:name" name="user" component={User}/>
        <Route component={requireAuthentication(Accounts)}>
          <Route path="/accounts/photo" name="photo" component={Photo}/>
          <Route path="/accounts/edit" name="edit" component={Edit}/>
          <Route path="/accounts/password" name="password" component={Password}/>
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
app);
