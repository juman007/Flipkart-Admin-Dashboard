import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions/action";

const Category = () => {
   const dispatch = useDispatch();
   const category = useSelector((state) => state.category);

   useEffect(() => {
      dispatch(getAllCategory());
   }, []);

   const renderCategories = (categories) => {
      let categoryList = [];

      for (let cat of categories) {
         categoryList.push(
            <li key={cat._id}>
               {cat.name}

               <ul>
                  {cat.children && cat.children.length > 0 ? (
                     <ul>{renderCategories(cat.children)}</ul>
                  ) : null}
               </ul>
            </li>
         );
      }

      return categoryList;
   };

   return (
      <Layout sidebar>
         <Container>
            <Row>
               <Col md={12}>
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "space-between",
                     }}
                  >
                     <h3>Category</h3>
                     <button>Add</button>
                  </div>
               </Col>
            </Row>
            <Row>
               <Col>
                  <ul>{renderCategories(category.categories)}</ul>{" "}
               </Col>
            </Row>
         </Container>
      </Layout>
   );
};

export default Category;
