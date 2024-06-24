import React from "react";
import Layout from "../../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import InputComponent from "../../components/UI/Input/inputComponent";

const Signup = (props) => {
   return (
      <Layout>
         <Container>
            <Row style={{ marginTop: "50px" }}>
               <Col md={{ span: 6, offset: 3 }}>
                  <Form>
                     <Row>
                        <Col md={6}>
                           <InputComponent
                              label="First Name"
                              placeholder="Enter your first name"
                              type="text"
                              value=""
                              onChange={() => {}}
                           />
                        </Col>

                        <Col md={6}>
                           <InputComponent
                              label="Last Name"
                              placeholder="Enter your last name"
                              type="text"
                              value=""
                              onChange={() => {}}
                           />
                        </Col>
                     </Row>

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

export default Signup;
