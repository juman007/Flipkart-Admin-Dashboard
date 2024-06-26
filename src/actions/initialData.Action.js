import { type } from "@testing-library/user-event/dist/type";
import { categoryConstants, productConstants } from "./constant.Action";
import axios from "../helpers/axios";

export const getInitialData = () => {
   return async (dispatch) => {
      const res = await axios.post("initialdata");
      if (res.status === 200) {
         const { categories, products } = res.data;

         dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
            payload: { categories },
         });

         dispatch({
            type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
            payload: { products },
         });
      }
   };
};
