import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import InputComponent from "../../components/UI/Input/inputComponent";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/product.Action";
import NewModel from "../../components/UI/Model/Model";

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
   const product = useSelector((state) => state.product);

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

   const renderProducts = () => {
      return (
         <Table responsive="sm">
            <thead>
               <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Table Product Picture</th>
                  <th>Category</th>
               </tr>
            </thead>
            <tbody>
               {product.products.length > 0
                  ? product.products.map((p, index) => (
                       <tr key={p._id}>
                          <td>{index + 1}</td>
                          <td>{p.name}</td>
                          <td>{p.price}</td>
                          <td>{p.quantity}</td>
                          <td>{p.description}</td>
                          <td>--</td>
                       </tr>
                    ))
                  : null}
            </tbody>
         </Table>
      );
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
                     <h3>Add Product</h3>
                     <button onClick={handleShow}>Add</button>
                  </div>
               </Col>
            </Row>

            <Row>
               <Col>{renderProducts()}</Col>
            </Row>
         </Container>

         {/*//todo:    Model */}

         <NewModel
            show={show}
            modelTitle="Add Product"
            handleClose={handleClose}
            button="Add Product"
         >
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
         </NewModel>
      </Layout>
   );
};

export default Products;
