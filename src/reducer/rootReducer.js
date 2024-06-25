import { combineReducers } from "redux";
import authReducer from "./auth.Reducer";
import userReducer from "./user.Reducer";

const rootReucer = combineReducers({
   auth: authReducer,
   user: userReducer,
});

export default rootReucer;
