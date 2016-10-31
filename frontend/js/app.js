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
import NotFound from './components/NotFoundComponent/notfound';


const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Foods} />
        <Route component={Auth}>
          <Route path="/register" name="register" component={Register}/>
          <Route path="/login" name="login" component={Login}/>
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
app);
