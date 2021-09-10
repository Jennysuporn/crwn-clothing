import CartActionTypes from "./cart.types";

const INITIAL_STATE = {
    hidden: true  //it's because we want to hide the cart when the user has not signed in yet
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            return state;
    }
}

export default cartReducer;