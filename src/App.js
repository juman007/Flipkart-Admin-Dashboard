import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/auth.Action";
import Products from "./containers/Products/Products";
import Orders from "./containers/Orders/Orders";

function App() {
   const dispatch = useDispatch();
   const auth = useSelector((state) => state.auth);

   useEffect(() => {
      if (!auth.authentiate) {
         dispatch(isUserLoggedIn());
      }
   }, []);

   return (
      <div className="App">
         <Router>
            <Routes>
               <Route
                  path="/"
                  element={
                     <PrivateRoute>
                        <Home />
                     </PrivateRoute>
                  }
               />
               <Route
                  path="/products"
                  element={
                     <PrivateRoute>
                        <Products />
                     </PrivateRoute>
                  }
               />
               <Route
                  path="/orders"
                  element={
                     <PrivateRoute>
                        <Orders />
                     </PrivateRoute>
                  }
               />
               <Route path="/signin" element={<Signin />} />
               <Route path="/signup" element={<Signup />} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
