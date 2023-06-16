import { ADD_PRODUCTS,ADD_TO_CART,REMOVE_FROM_CART,CLEAR_CART,UPDATE_CART_PRODUCTS } from "./product.type";


export const addProducts=(data)=>{
    return {
        type:ADD_PRODUCTS,
        payload:data
    }
}

export const updateCartProducts = (cartProducts) => {
  return {
    type: UPDATE_CART_PRODUCTS,
    payload: cartProducts,
  };
};

export const addToCart=(id)=>{
    return{
        type:ADD_TO_CART,
        payload:id
    }
}

export const removeFromCart=(id)=>{
    return{
        type:REMOVE_FROM_CART,
        payload:id
    }
}

export const clearCart=()=>{
    return{
        type:CLEAR_CART,
    }
}