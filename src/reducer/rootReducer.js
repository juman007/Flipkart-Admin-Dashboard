import { combineReducers } from "redux";
import authReducer from "./auth.Reducer";
import userReducer from "./user.Reducer";
import productReducer from "./product.Reducer";
import categoryReducer from "./category.Reducer";
import orderReducer from "./order.Reducer";

const rootReucer = combineReducers({
   auth: authReducer,
   user: userReducer,
   product: productReducer,
   category: categoryReducer,
   order: orderReducer,
});

export default rootReucer;
