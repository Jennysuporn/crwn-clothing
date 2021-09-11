import { createSelector } from "reselect";


//input selector
//this is a function that get whole state, and just returns a slice of it.
const selectCart = state => state.cart;

const selectUser = state => state.user;

//output 
// selectCartItems is "property on our cart which is state.cart"
// createSelector()
//      first argument is a collection which is an array of input selectors. **it can be anything
//      second argument is a function that will return the value we want out of the selector.
export const selectCartItems = createSelector( //with createSelector, this is memorization (cach)
    [selectCart],
    cart => cart.cartItems
);

export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumulatedQuantity, cartItem) => accumulatedQuantity+cartItem.quantity,
            0
        )
);
