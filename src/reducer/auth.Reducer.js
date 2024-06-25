import { authConstants } from "../actions/constant.Action";

const initState = {
   token: null,
   user: {
      firstName: "",
      lastName: "",
      email: "",
      picture: "",
   },
   authenticate: false,
   authenticating: false,
};

export default (state = initState, action) => {
   switch (action.type) {
      case authConstants.LOGIN_REQUEST:
         state = {
            ...state,
            authenticating: true,
         };
         break;
      case authConstants.LOGIN_SUCCESS:
         state = {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
            authenticate: true,
            authenticating: false,
         };
         break;
      case authConstants.LOGOUT_REQUEST:
         state = {
            ...initState,
         };
         break;
   }

   return state;
};
