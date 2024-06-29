import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../../actions/action";
import InputComponent from "../UI/Input/inputComponent";
import NewModel from "../UI/Model/Model";
import CheckboxTree from "react-checkbox-tree";
import {
   IoIosCheckboxOutline,
   IoIosCheckbox,
   IoIosArrowDown,
   IoIosArrowForward,
} from "react-icons/io";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { CgLaptop } from "react-icons/cg";

const Category = (props) => {
   const [show, setShow] = useState(false);
   const [categoryName, setCategoryName] = useState("");
   const [parentCategoryId, setParentCategoryId] = useState("");
   const [categoryImage, setCategoryImage] = useState("");
   const [checked, setChecked] = useState([]);
   const [expanded, setExpanded] = useState([]);
   const [checkedArray, setCheckedArray] = useState([]);
   const [expandedArray, setExpandedArray] = useState([]);
   const [updateCategoryModel, setUpdateCategoryModel] = useState(false);

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

      categories.forEach((cat) => {
         let node = {
            label: cat.name,
            value: cat._id,
            children:
               cat.children.length > 0 ? renderCategories(cat.children) : [],
         };
         categoryList.push(node);
      });

      return categoryList;
   };

   const createCategoryList = (categories, options = []) => {
      categories.forEach((category) => {
         options.push({
            value: category._id,
            name: category.name,
            parentId: category.parentId,
         });

         if (category.children && category.children.length > 0) {
            createCategoryList(category.children, options);
         }
      });

      return options;
   };

   const handleCategoryImage = (e) => {
      setCategoryImage(e.target.files[0]);
   };

   const updateCategory = () => {
      setUpdateCategoryModel(true);
      const categories = createCategoryList(category.categories);
      console.log(categories, checked, expanded);
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
               {/* <Col>
                  <ul>{renderCategories(category.categories)}</ul>{" "}
               </Col> */}
               <CheckboxTree
                  nodes={renderCategories(category.categories)}
                  checked={checked}
                  expanded={expanded}
                  onCheck={(checked) => setChecked(checked)}
                  onExpand={(expanded) => setExpanded(expanded)}
                  icons={{
                     check: <IoIosCheckbox />,
                     uncheck: <IoIosCheckboxOutline />,
                     halfCheck: <IoIosCheckboxOutline />,
                     expandClose: <IoIosArrowForward />,
                     expandOpen: <IoIosArrowDown />,
                  }}
               />
            </Row>

            <Row>
               <Col>
                  <button>Delete</button>
                  <button onClick={updateCategory}>Update</button>
               </Col>
            </Row>
         </Container>

         {/*//todo:    Model */}
         <NewModel
            show={show}
            handleClose={handleClose}
            modelTitle={"Add New Category"}
            button={"Add Category"}
         >
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
         </NewModel>

         {/* //!   edit category */}

         <NewModel
            show={updateCategoryModel}
            handleClose={() => setUpdateCategoryModel(false)}
            modelTitle={"Update Category"}
            button={"Update Category"}
            size="lg"
         >
            {/* <Row>
               <col>
                  <h6>Expended</h6>
               </col>
            </Row> */}

            <Row>
               {/* //todo:   new Category */}
               <Col>
                  <InputComponent
                     value={categoryName}
                     onChange={(e) => setCategoryName(e.target.value)}
                     placeholder={"Category Name"}
                  />
               </Col>

               {/* //todo       select parent Category */}
               <Col>
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
               </Col>

               <Col>
                  <select className="form-control">
                     <option value="">Select Type</option>
                     <option value="store">Store</option>
                     <option value="product">Product</option>
                     <option value="page">Page</option>
                  </select>
               </Col>
            </Row>

            {/* //todo:     category Image */}

            {/* <input
               type="file"
               name="categoryImage"
               onChange={handleCategoryImage}
            /> */}
         </NewModel>
      </Layout>
   );
};

export default Category;
