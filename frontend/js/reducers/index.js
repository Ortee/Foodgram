import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import alerts from './alerts';
import foods from './foods';
import auth from './auth';

const rootReducer = combineReducers({
  alerts,
  foods,
  auth,
  routing: routerReducer,
});

export default rootReducer;
