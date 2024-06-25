import { type } from "@testing-library/user-event/dist/type";
import axios from "../helpers/axios";
import { categoryConstants } from "./constant.Action";

export const getAllCategory = () => {
   return async (dispatch) => {
      dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

      const res = await axios.get("category/getcategories");

      if (res.status === 200) {
         const { categories } = res.data;

         dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
            payload: {
               categories,
            },
         });
      } else {
         dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
            payload: {
               error: res.data.error,
            },
         });
      }
   };
};
