import axios from "axios";
import {api} from "../urlConfig.js";

const axiosInstance = axios.create({
   baseURL: api,

   //    headers: {
   //       Authorization: "",
   //    },
});
export default axiosInstance;
