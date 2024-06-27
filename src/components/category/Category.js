import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../../actions/action";
import InputComponent from "../UI/Input/inputComponent";

const Category = (props) => {
   const [show, setShow] = useState(false);
   const [categoryName, setCategoryName] = useState("");
   const [parentCategoryId, setParentCategoryId] = useState("");
   const [categoryImage, setCategoryImage] = useState("");

   const dispatch = useDispatch();
   const category = useSelector((state) => state.category);

   const handleClose = () => {
      const form = new FormData();

      form.append("name", categoryName);
      form.append("parentId", parentCategoryId);
      form.append("categoryImage", categoryImage);

      dispatch(addCategory(form)).then(() => {
         dispatch(getAllCategory()); // Fetch updated categorie
         setShow(false);

         setCategoryName("");
         setParentCategoryId("");
         setCategoryImage("");
      });
   };
   const handleShow = () => setShow(true);

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

   const createCategoryList = (categories, options = []) => {
      categories.forEach((category) => {
         options.push({ value: category._id, name: category.name });

         if (category.children && category.children.length > 0) {
            createCategoryList(category.children, options);
         }
      });

      return options;
   };

   const handleCategoryImage = (e) => {
      setCategoryImage(e.target.files[0]);
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
                     <button onClick={handleShow}>Add</button>
                  </div>
               </Col>
            </Row>
            <Row>
               <Col>
                  <ul>{renderCategories(category.categories)}</ul>{" "}
               </Col>
            </Row>
         </Container>

         {/*//todo:    Model */}

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Add New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {/* //todo:   new Category */}
               <InputComponent
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder={"Category Name"}
               />

               {/* //todo       select parent Category */}

               <select
                  className="form-control"
                  value={parentCategoryId}
                  onChange={(e) => setParentCategoryId(e.target.value)}
               >
                  <option>Select Category</option>
                  {createCategoryList(category.categories).map((option) => (
                     <option key={option.value} value={option.value}>
                        {option.name}
                     </option>
                  ))}
               </select>

               {/* //todo:     category Image */}

               <input
                  type="file"
                  name="categoryImage"
                  onChange={handleCategoryImage}
               />
            </Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={handleClose}>
                  Add Category
               </Button>
            </Modal.Footer>
         </Modal>
      </Layout>
   );
};

export default Category;
