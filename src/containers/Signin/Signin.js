import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import InputComponent from "../../components/UI/Input/inputComponent";
import { login } from "../../actions/action";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Signin = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const auth = useSelector((state) => state.auth);

   const dispatch = useDispatch();

   if (auth.authenticate) {
      return <Navigate to={"/"} />;
   }

   const userLogin = (e) => {
      e.preventDefault();

      const user = {
         email,
         password,
      };
      dispatch(login(user));
   };

   return (
      <Layout>
         <Container>
            <Row style={{ marginTop: "50px" }}>
               <Col md={{ span: 6, offset: 3 }}>
                  <Form onSubmit={userLogin}>
                     <InputComponent
                        label="Email"
                        placeholder="Enter your email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />

                     <InputComponent
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />

                     <Button variant="primary" type="submit">
                        Submit
                     </Button>
                  </Form>
               </Col>
            </Row>
         </Container>
      </Layout>
   );
};

export default Signin;
