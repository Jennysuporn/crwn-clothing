//**Middleware is the peice in the middle between action and root reducer, therefore, we need middleware
//** Middleware is just functions that receive actions in and do somethinf with them and then pass them out to the root producer
//** Logger is console log for us. This is nice for us to use for debugging redux code */

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;