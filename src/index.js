import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 
//Provider is a component that is the parent of everything inside of our application => 
//when we have provider, we need to write the store itself => create src/redux folder
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store'; 

import './index.css';
import App from './App';


ReactDOM.render(
  <Provider store={store}>  
    <BrowserRouter>
      <PersistGate persistor={persistor}> 
      <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);