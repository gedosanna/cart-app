import {ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART, GET_PRICES} from '../actions/types';

const initialCart = {
    cart: [{
        id: 0,
        name: 'Headphones',
        amount: 2,
        picture: '',
        price: 11.90.toFixed(2)
    }],
    shipping: 23.80.toFixed(2),
    subTotal: 23.80.toFixed(2),
    grandTotal: 23.80.toFixed(2)
}

const cartReducer = (state = initialCart, action) => {
    switch(action.type) {
        case ADD_TO_CART: {
            return {
                cart: state.cart.concat(action.product)
            }
        }
        case REMOVE_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter(product => (product.id !== action.id))
            }
        }
        case UPDATE_CART: {
            state.cart.find((product, i) => {if(product.id === action.id) state.cart[i].amount = action.amount})
            return {
                ...state
            }
        }
        case GET_PRICES: {
            let cartTotal = 0, shipping, grandTotal;
            state.cart.forEach((product) => {cartTotal = cartTotal + product.amount * product.price});
            shipping = cartTotal > 100 ? 'FREE!' : 23.80;
            grandTotal = cartTotal > 100 ? cartTotal: shipping + cartTotal
            return {
                ...state,
                shipping: shipping,
                subTotal: cartTotal.toFixed(2),
                grandTotal: grandTotal.toFixed(2)
            }
        }
        default:
            return state
    }
}

export default cartReducer;