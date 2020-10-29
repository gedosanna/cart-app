import {ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART, GET_PRICES} from '../actions/types';

export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product: product
    }
}

export const removeFromCart = id => {
    return {
        type: REMOVE_FROM_CART,
        id: id
    }
}

export const updateCart = (arr) => {
    return {
        type: UPDATE_CART,
        id: arr[0],
        amount: arr[1]
    }
}

export const getPrices = () => {
    return {
        type: GET_PRICES
    }
}