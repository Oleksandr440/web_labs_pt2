import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, 
    CLEAR_CART, LOGIN_USER, LOGOUT_USER} from './actions';

const initialState = {
    cartItems: [],
    user: localStorage.getItem('userEmail') || null
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    )
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload)
            };

        case INCREASE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };

        case DECREASE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            };
        
        case CLEAR_CART:
            return {
                ...state,
                cartItems: []
            };

        case LOGIN_USER:
            localStorage.setItem('userEmail', action.payload);
            return {
                ...state,
                user: action.payload
            };

        case LOGOUT_USER:
            localStorage.removeItem('userEmail');
            return {
                ...state,
                user: null,
                cartItems: []
            };

        default:
            return state;
    }
};