//This file is created for...
//When user add the same item to cart, the number of item should be increase instead of showing the same item many times

import CartItem from "../../components/cart-item/cart-item.component";

//here, the cartItems is all the existing cart items that are in our cartItems array right now
//here, the cartItemToAdd is the cart item that we want to add.
//concept : we're going to look inside of our existing cart items to see if our cart item already exists.
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if(existingCartItem){ //If found cart item, let's compare which items should be quantity+1
        return cartItems.map(cartItem => //map means each item in the array
            cartItem.id === cartItemToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}] //quantity is 1 because it's the first time that this item is added
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id == cartItemToRemove.id
    )

    if (existingCartItem.quantity == 1) {   //if it has only 1, remove this item
        return cartItems.filter(cartItem => cartItem.id != cartItemToRemove.id)
    }

    return cartItems.map (
        cartItem => 
        cartItem.id == cartItemToRemove.id 
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )
};


// Note:

//  cartItems.find() will return the first item found in our array based on condition that is passed in.

//  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)
//  equal to
//  cartItems.find(function (cartItem) {
//     return cartItem.id === cartItemToAdd.id;
//   });