//**Middleware is the peice in the middle between action and root reducer, therefore, we need middleware
//** Middleware is just functions that receive actions in and do somethinf with them and then pass them out to the root producer
//** Logger is console log for us. This is nice for us to use for debugging redux code */

import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [];

//Show logger ony in development mode
//when we run "yarn build" the process.env.NODE_ENV will be automatically switched to production mode
//when we run "yarn start" (localhost) the process.env.NODE_ENV will be automatically switched to development mode 
if(process.env.NODE_ENV == 'development') {    
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store); //Creatinf this new persisted version of our store

export default { store , persistor };