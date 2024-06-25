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

// export const addCategory = (form) => {
//    return async (dispatch) => {
//       const res = await axios.post("category/create", form);
//       console.log(res);
//    };
// };

export const addCategory = (form) => {
   return async (dispatch) => {
      dispatch({ type: categoryConstants.ADD_NEW_CATEGORIES_REQUEST });
      try {
         const res = await axios.post("category/create", form);
         if (res.status === 200 || res.status === 201) {
            dispatch({
               type: categoryConstants.ADD_NEW_CATEGORIES_SUCCESS,
               payload: { category: res.data.category },
            });
         } else {
            dispatch({
               type: categoryConstants.ADD_NEW_CATEGORIES_FAILURE,
               payload: { error: res.data.error },
            });
         }
      } catch (error) {
         dispatch({
            type: categoryConstants.ADD_NEW_CATEGORIES_FAILURE,
            payload: { error: error.message },
         });
      }
   };
};
