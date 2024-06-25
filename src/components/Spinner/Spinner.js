import React from "react";
import "./Spinner.css";

const Spinner = () => {
   return (
      <div
         className="d-flex justify-content-center align-items-center"
         style={{ height: "100vh" }}
      >
         <div
            class="spinner-grow text-danger"
            role="status"
            style={{ width: "5rem", height: "5rem" }}
         >
            <span className="visually-hidden">Loading...</span>
         </div>
      </div>
   );
};

export default Spinner;
