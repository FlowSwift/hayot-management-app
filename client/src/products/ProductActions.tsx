import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { Category } from "../common/types";

import CategorySelect from "../categories/CategorySelect";
import BrandSelect from '../brands/BrandSelect';

interface Props {
  manageType: string | undefined
};

const ProductActions: FC<Props> = ({ manageType }) => {  
  const addIcon = <FontAwesomeIcon icon={faPlus} />;
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<undefined | Category[]>();
  const [category_id, setCategoryId] = useState(undefined);
  const [brand_id, setBrandId] = useState(undefined);

  // Open form should probably reset fields somehow
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = async () => {
    const prod = {
      name: name,
      brand_id: brand_id,
      category_id: category_id
    };

    console.log(prod);

    // try {
    //   const { data: response } = await axios.post('http://localhost:5000/products/',
    //   {
    //     id: 2,
    //     name: "blabla", 
    //     price: 1337, 
    //     weight: "blabla", 
    //     ean: "blabla", 
    //     brand_name: "blabla", 
    //     category_name: "blabla"});
    // }
    // catch{

    // }
    // // Submit edited product details to server
    // //handleClose();
  };

  return (
    <div>
      <Form>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
              Search
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="Search"
              type="search"
            />
          </Col>
          {/* <Col xs="auto">
            <Button type="button" className="mb-2">
              Export
            </Button>
          </Col> */}
          <Col xs="auto">
            <Button type="button" className="mb-2" onClick={handleOpen}>
              {addIcon} Add {manageType}
            </Button>

            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formProductName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Group>

                  {/* TODO: add onchange handlers */}
                  <Form.Group className="mb-3" controlId="formProductBrand">
                      <Form.Label>Brand</Form.Label>
                      <BrandSelect
                          activeId={brand_id}
                          stateChanger={setBrandId}
                      />
                  </Form.Group>

                  {/* TODO: update categories by state's brand ID */}
                  <Form.Group className="mb-3" controlId="formProductCategory">
                      <Form.Label>Category</Form.Label>
                      <CategorySelect
                          activeId={category_id}
                          brandId={brand_id}
                          categories={categories}
                          stateChanger={setCategoryId}
                          listChanger={setCategories}
                      />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Add Product
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default ProductActions;