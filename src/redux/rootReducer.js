import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authReducer/auth.reducers';
import productReducer from './productsReducer/product.reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['sidebar'],
};

const rootReducer = combineReducers({
  auth:authReducer ,
  product:productReducer

});

export default persistReducer(persistConfig, rootReducer);