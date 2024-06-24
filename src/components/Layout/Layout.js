import React from "react";
import Header from "../Header/Header.js";

const Layout = (props) => {
   return (
      <>
         <Header />
         {props.children}
      </>
   );
};

export default Layout;
