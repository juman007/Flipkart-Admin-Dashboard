import React from "react";
import Layout from "../../components/Layout/Layout";
import { Container } from "react-bootstrap";

const Home = () => {
   return (
      <Layout>
         <Container className="text-center mt-5 p-5">
            <h1>Wellcome to Admin Dashboard</h1>
            <p>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum
               officia laboriosam laudantium fugiat nostrum, magnam quas eius
               eaque esse beatae quasi autem recusandae iure illum sit ipsam
               repellendus molestias, ducimus explicabo rem. Molestias nisi
               velit rem quia, in officiis eos odio aut, sit saepe fugiat libero
               ut. In, aliquam optio!
            </p>
         </Container>
      </Layout>
   );
};

export default Home;
