import React from "react";
import Header from "../Header/Header.js";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Layout.css";

const Layout = (props) => {
   return (
      <>
         <Header />
         {props.sidebar ? (
            <Container className="mt-2">
               <Row>
                  <Col md={2} className="sidebar">
                     <ul>
                        <li>
                           <NavLink to={"/"}>Home</NavLink>
                        </li>
                        <li>
                           <NavLink to={"/category"}>Category</NavLink>
                        </li>
                        <li>
                           <NavLink to={"/products"}>Products</NavLink>
                        </li>
                        <li>
                           <NavLink to={"/orders"}>Orders</NavLink>
                        </li>
                     </ul>
                  </Col>
                  <Col
                     md={10}
                     style={{ marginLeft: "auto", paddingTop: "60px" }}
                  >
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
