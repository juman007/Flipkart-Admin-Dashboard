import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
   return (
      <>
         <Navbar
            collapseOnSelect
            expand="lg"
            className="bg-primary"
            style={{ zIndex: 1 }}
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
                  <Nav>
                     {/* <Nav.Link href="#deets" className="text-light">
                        Signin
                     </Nav.Link> */}

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
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   );
};

export default Header;
