import { authConstants } from "../actions/constant.Action";

const initState = {
   name: "Juman",
};

export default (state = initState, action) => {
   console.log(action);
   switch (action.type) {
      case authConstants.LOGIN_REQUEST:
         state = {
            ...state,
            ...action.payload,
         };
         break;
   }
   return state;
};
