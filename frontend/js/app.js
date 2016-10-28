import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store/store';

import App from './components/app';
import Main from './components/MainComponent/main';
import Author from './components/AuthorComponent/author';
import Foods from './components/FoodComponent/foods';
import NotFound from './components/NotFoundComponent/notfound';

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Foods}></IndexRoute>
        <Route path="/author" name="author" component={Author}/>
        <Route path="/foods" name="foods" component={Foods}/>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>,
app);
