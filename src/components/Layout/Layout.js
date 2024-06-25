import React from "react";
import Header from "../Header/Header.js";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Layout = (props) => {
   return (
      <>
         <Header />
         {props.sidebar ? (
            <Container className="mt-5 p-5">
               <Row>
                  <Col md={2} className="sidebar">
                     <ul>
                        <li>
                           <NavLink to={"/"}>Home</NavLink>
                        </li>
                        <li>
                           <NavLink to={"/products"}>Products</NavLink>
                        </li>
                        <li>
                           <NavLink to={"/orders"}>Orders</NavLink>
                        </li>
                     </ul>
                  </Col>
                  <Col md={10} style={{ marginLeft: "auto" }}>
                     {props.children}
                  </Col>
               </Row>
            </Container>
         ) : (
            props.children
         )}
      </>
   );
};

export default Layout;
