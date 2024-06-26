import { type } from "@testing-library/user-event/dist/type/index.js";
import axios from "../helpers/axios.js";
import { authConstants } from "./constant.Action";

export const login = (user) => {
   return async (dispatch) => {
      dispatch({ type: authConstants.LOGIN_REQUEST });

      const res = await axios.post(`admin/signin`, {
         ...user,
      });

      if (res.status === 200) {
         const { token, user } = res.data;
         localStorage.setItem("token", token);
         localStorage.setItem("user", JSON.stringify(user));
         dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
               token,
               user,
            },
         });
         //todo: Refresh the page after successful login
         window.location.reload();
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

export const isUserLoggedIn = () => {
   return async (dispatch) => {
      const token = window.localStorage.getItem("token");
      if (token) {
         const user = JSON.parse(window.localStorage.getItem("user"));
         dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
               token,
               user,
            },
         });
      } else {
         dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: {
               error: "Failed to login",
            },
         });
      }
   };
};

export const signout = () => {
   return async (dispatch) => {
      dispatch({ type: authConstants.LOGOUT_REQUEST });

      try {
         const res = await axios.post(`admin/signout`);

         if (res.status === 200) {
            window.localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
         } else {
            dispatch({
               type: authConstants.LOGOUT_FAILURE,
               payload: { error: res.data.error || "Failed to logout" },
            });
         }
      } catch (error) {
         dispatch({
            type: authConstants.LOGOUT_FAILURE,
            payload: { error: error.message || "Failed to logout" },
         });
      }
   };
};
