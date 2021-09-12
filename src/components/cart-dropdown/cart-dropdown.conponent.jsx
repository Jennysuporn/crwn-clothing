import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { withRouter } from "react-router";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => ( //history gets from withRouter in the last line
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.length ? (//if there's no any item in the cart
                cartItems.map(cartItem => (
                    <CartItem key={cartItems.id} item={cartItem} />
                ))
            ) : (
                <span className='empty-message'>Your cart is empty</span>
            )}
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden()); //when the checkout page is opened, the cart-drop down should be hidden
        }}> GO TO CHECKOUT</CustomButton> 
    </div>
);


// const mapStateToProps = (state) => ({
//     cartItems: selectCartItems(state)
// });

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});


export default withRouter(connect(mapStateToProps)(CartDropdown));  //connect actually passes dispatch into our components as a prop if we don't supply a second argument to connect.
//So, if we don't supply mapDispatchTheProps as the second parameter, connect will pass the dispatch in to CartDropdown()