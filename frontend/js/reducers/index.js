import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import alerts from './alerts';
import foods from './foods';
import auth from './auth';
import user from './user';

const rootReducer = combineReducers({
  alerts,
  foods,
  auth,
  user,
  routing: routerReducer,
});

export default rootReducer;
