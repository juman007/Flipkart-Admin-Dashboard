import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import InputComponent from "../../components/UI/Input/inputComponent";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/user.Action";

const Signup = (props) => {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);
   const auth = useSelector((state) => state.auth);

   const userSubmit = (e) => {
      e.preventDefault();
      const user = {
         firstName,
         lastName,
         email,
         password,
      };
      dispatch(signup(user));

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
   };

   if (auth.authenticate) {
      return <Navigate to={"/"} />;
   }

   if (user.loading) {
      return <p>Loading...!</p>;
   }

   return (
      <Layout>
         <Container>
            {user.message}
            <Row style={{ marginTop: "50px" }}>
               <Col md={{ span: 6, offset: 3 }}>
                  <Form onSubmit={userSubmit}>
                     <Row>
                        <Col md={6}>
                           <InputComponent
                              label="First Name"
                              placeholder="Enter your first name"
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                           />
                        </Col>

                        <Col md={6}>
                           <InputComponent
                              label="Last Name"
                              placeholder="Enter your last name"
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                           />
                        </Col>
                     </Row>

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

export default Signup;
