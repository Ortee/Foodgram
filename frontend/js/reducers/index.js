import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import alerts from './alerts';
import foods from './foods';

const rootReducer = combineReducers({
  alerts,
  foods,
  routing: routerReducer,
});

export default rootReducer;
