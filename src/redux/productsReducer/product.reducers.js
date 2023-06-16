import {
  ADD_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_CART_PRODUCTS
} from "./product.type";

const initialState = {
  products: [],
  cart: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case ADD_TO_CART:
      const item = state.products.find((item) => item._id === action.payload);
      const isPresent = state.cart.find((item) =>
        item._id === action.payload ? true : false
      );
      return {
        ...state,
        cart: isPresent
          ? state.cart.map((item) =>
              item._id === action.payload
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };

    case REMOVE_FROM_CART:
      case REMOVE_FROM_CART:
      const updatedCart = state.cart.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        cart: updatedCart,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

      case UPDATE_CART_PRODUCTS:
      return {
        ...state,
        cart: action.payload, 
      };


    default:
      return state;
  }
};

export default productReducer;
