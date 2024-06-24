import React from "react";
import "./App.css";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import Home from "./containers/Home/Home";
import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";

function App() {
   return (
      <div className="App">
         <Router>
            {/* <PrivateRoute path={"/"} element={<Home />} /> */}
            <Routes>
               {/* <Route path={"/"} element={<PrivateRoute />}>
                  <Route path="/" element={<Home />} />
               </Route> */}
               {/* <Route path="/" element={<Home />} /> */}
               <Route
                  path="/"
                  element={
                     <PrivateRoute>
                        <Home />
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
