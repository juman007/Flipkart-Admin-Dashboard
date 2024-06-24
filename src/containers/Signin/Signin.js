import React from "react";
import Layout from "../../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import InputComponent from "../../components/UI/Input/inputComponent";
import { login } from "../../actions/action";
import { useDispatch } from "react-redux";

const Signin = () => {
   const dispatch = useDispatch();

   const userLogin = (e) => {
      e.preventDefault();

      const user = {
         email: "validate@gmail.com",
         password: "123456",
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
                        value=""
                        onChange={() => {}}
                     />

                     <InputComponent
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value=""
                        onChange={() => {}}
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
