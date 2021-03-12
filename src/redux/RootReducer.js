import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ProductsReducer from "./ProductsReducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  products: ProductsReducer,
});

export default RootReducer;
