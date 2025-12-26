export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const addToCart = (game, quantity) => ({
    type: ADD_TO_CART,
    payload: { ...game, quantity }
});

export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    payload: id
});

export const increaseQuantity = (id) => ({
    type: INCREASE_QUANTITY,
    payload: id
});

export const decreaseQuantity = (id) => ({
    type: DECREASE_QUANTITY,
    payload: id
});

export const clearCart = () => ({
    type: CLEAR_CART
});

export const loginUser = (email) => ({
    type: LOGIN_USER,
    payload: email
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});