import axios from "../helpers/axios.js";
import { authConstants } from "./constant.Action";

export const login = (user) => {
   return async (dispatch) => {
      dispatch({ type: authConstants.LOGIN_REQUEST });

      const res = await axios.post(`api/admin/signin`, {
         ...user,
      });

      if (res.status === 200) {
         const { token, user } = res.data;
         localStorage.setItem("token", token);
         dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
               token,
               user,
            },
         });
      } else {
         if (res.status === 400) {
            dispatch({
               type: authConstants.LOGIN_FAILURE,
               payload: {
                  error: res.data.error,
               },
            });
         }
      }
   };
};
