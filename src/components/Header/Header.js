import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/auth.Action";

const Header = () => {
   const auth = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   const logout = () => {
      dispatch(signout());
   };

   const renderLoggedInLinks = () => {
      return (
         <Nav>
            <li className=" nav-item">
               <span
                  className="nav-link text-light"
                  style={{ cursor: "pointer" }}
                  onClick={logout}
               >
                  Signout
               </span>
            </li>
         </Nav>
      );
   };

   const renderNonLoggedInLinks = () => {
      return (
         <Nav>
            <li className=" nav-item">
               <NavLink to="/signin" className="nav-link text-light">
                  Signin
               </NavLink>
            </li>
            <li className=" nav-item">
               <NavLink to="/signup" className="nav-link text-light">
                  Signup
               </NavLink>
            </li>
         </Nav>
      );
   };

   return (
      <>
         <Navbar
            collapseOnSelect
            expand="lg"
            className="bg-primary"
            style={{ zIndex: 1 }}
            fixed="top"
         >
            <Container>
               {/* <Navbar.Brand href="#home" className="text-light">
                  Admin Dashboard
               </Navbar.Brand> */}
               <Link to={"/"} className="navbar-brand text-light">
                  Admin Dashboard
               </Link>

               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                     {/* <NavDropdown
                        title="Dropdown"
                        id="collapsible-nav-dropdown"
                        className="text-light"
                     >
                        <NavDropdown.Item href="#action/3.1" className="text-light">
                           Action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2" className="text-light">
                           Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3" className="text-light">
                           Something
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4" className="text-light">
                           Separated link
                        </NavDropdown.Item>
                     </NavDropdown> */}
                  </Nav>
                  {auth.authenticate
                     ? renderLoggedInLinks()
                     : renderNonLoggedInLinks()}
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   );
};

export default Header;
