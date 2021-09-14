import { combineReducers } from "redux";
import { persistReducer } from "redux-persist"; // import this because we persist in our store (store.js),but now we want to persist reducer
import storage from 'redux-persist/lib/storage'; // storage is local storage on our window browser

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
    key: 'root',    //key is the point inside of our reducer our object we want to start storing everythinf and we want to start from the root.
    storage,        //object that we import
    whitelist: ['cart']   //whitelist property is an array containing the string names of any of the reducer that we want to store 
}                           

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);  //It's a modified version of our route reducer, except now with persistance capabilities