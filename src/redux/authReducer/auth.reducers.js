import { LOGIN, LOGOUT } from "./auth.types";

const initialState = {
  isLoggedIn: false,
  data: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        data: action.payload,
        isLoggedIn:true
      };

    case LOGOUT:
      return {
        ...state,
        data: action.payload,
        isLoggedIn:false
      };

      default:
        return state
  }
};

export default authReducer;
