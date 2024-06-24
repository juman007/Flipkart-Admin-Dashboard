import authReducer from "./auth.Reducer";
import { combineReducers } from "redux";

const rootReucer = combineReducers({
   auth: authReducer,
});

export default rootReucer;
