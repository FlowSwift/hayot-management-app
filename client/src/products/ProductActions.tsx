import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
// import { Product } from "../common/types";

interface Props {
  manageType: string | undefined
};

const ProductActions: FC<Props> = ({ manageType }) => {  
  const addIcon = <FontAwesomeIcon icon={faPlus} />;
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [brand_name, setBrand] = useState("");

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  const handleSave = async () => {
    // try {
    //   const { data: response } = await axios.put('http://localhost:5000/products/',
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
                    <Form.Control type="text" value="Name" onChange={(e) => setName(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formProductBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control as="textarea" value="Brand name" onChange={(e) => setBrand(e.target.value)} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
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