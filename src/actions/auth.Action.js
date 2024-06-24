import axios from "../helpers/axios.js";
import { authConstants } from "./constant.Action";

export const login = (user) => {
   return async (dispatch) => {
      const res = await axios.post(`/api/signin`, {
         ...user,
      });

      dispatch({
         type: authConstants.LOGIN_REQUEST,
         payload: {
            ...user,
         },
      });
   };
};
