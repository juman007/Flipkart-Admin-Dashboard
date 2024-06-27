import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import InputComponent from "../../components/UI/Input/inputComponent";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/product.Action";

const Products = (props) => {
   const [name, setName] = useState("");
   const [quantity, setQuantity] = useState("");
   const [price, setPrice] = useState("");
   const [description, setDescription] = useState("");
   const [categoryId, setCategoryId] = useState("");
   const [productPictures, setProductPictures] = useState([]); //
   const [show, setShow] = useState(false);

   const dispatch = useDispatch();
   const category = useSelector((state) => state.category);

   const handleClose = () => {
      const form = new FormData();

      form.append("name", name);
      form.append("quantity", quantity);
      form.append("price", price);
      form.append("description", description);
      form.append("category", categoryId);

      for (let pic of productPictures) {
         form.append("productPictures", pic);
      }

      dispatch(addProduct(form)).then(() => {
         setShow(false);
      });
   };

   const handleShow = () => setShow(true);

   const createCategoryList = (categories, options = []) => {
      categories.forEach((category) => {
         options.push({ value: category._id, name: category.name });

         if (category.children && category.children.length > 0) {
            createCategoryList(category.children, options);
         }
      });

      return options;
   };

   const handleProductPicture = (e) => {
      if (e.target.files && e.target.files[0]) {
         setProductPictures([...productPictures, e.target.files[0]]);
      }
   };
   console.log(productPictures);
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
                     <h3>Add Product</h3>
                     <button onClick={handleShow}>Add</button>
                  </div>
               </Col>
            </Row>
         </Container>

         {/*//todo:    Model */}

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Add New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <InputComponent
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={"Product Name"}
               />

               <InputComponent
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder={"Product quantity"}
               />

               <InputComponent
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={"Product price"}
               />

               <InputComponent
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={"Product Description"}
               />

               <select
                  className="form-control"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
               >
                  <option>Select Category</option>
                  {createCategoryList(category.categories).map((option) => (
                     <option key={option.value} value={option.value}>
                        {option.name}
                     </option>
                  ))}
               </select>

               {productPictures.length > 0
                  ? productPictures.map((pic, index) => (
                       <div key={index}>{JSON.stringify(pic.name)}</div>
                    ))
                  : ""}

               <input
                  type="file"
                  name="productPictures"
                  onChange={handleProductPicture}
               />
            </Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={handleClose}>
                  Add Product
               </Button>
            </Modal.Footer>
         </Modal>
      </Layout>
   );
};

export default Products;
