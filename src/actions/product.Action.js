import axios from "../helpers/axios";

export const addProduct = (form) => {
   return async (dispatch) => {
      try {
         const res = await axios.post("product/create", form);
         console.log(res);
         if (res.status === 200) {
            console.log("Product added successfully:", res.data);
         } else {
            console.log("Unexpected response:", res);
         }
      } catch (error) {
         console.error(
            "Error adding product:",
            error.response?.data || error.message
         );
      }
   };
};
