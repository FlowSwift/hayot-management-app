import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { Brand, Category } from "../common/types";

import CategorySelect from "../categories/CategorySelect";
import BrandSelect from '../brands/BrandSelect';

interface Props {
  refreshData: Function
};

const ProductActions: FC<Props> = ({ refreshData }) => {
  const addIcon = <FontAwesomeIcon icon={faPlus} />;
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<undefined | Category[]>();
  const [category_id, setCategoryId] = useState(undefined);
  const [brand_id, setBrandId] = useState(undefined);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [ean, setEan] = useState("");

  // Open form should probably reset fields somehow
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  // Prevent page from redirecting when user hits Enter
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    handleSave();
  }

  const checkfieldNan = (value: number) => {
    if (isNaN(value)){
      return 0
    }
    return value
  }

  //reset modal values
  const handleSave = async () => {
    setName("");
    setCategories(undefined);
    setCategoryId(undefined);
    setBrandId(undefined);
    setQuantity(0);
    setPrice(0);
    setWeight(0);
    setEan("");

    const prod = {
      name: name,
      price: price,
      weight: weight,
      quantity: quantity,
      ean: ean,
      category_id: category_id
    };

    console.log(prod);

    try {
      const { data: response } = await axios.post('http://localhost:5000/products/',
        prod);
    }
    catch (error) {
      console.log("DATABASE ERROR: ")
      console.log(error)
    }
    refreshData();
    handleClose();
  };

  return (
    <div>
      <Form>
        <Row className="align-items-center">
          <Col xs="auto">
            <Button type="button" className="mb-2" onClick={handleOpen}>
              {addIcon} Add Product
            </Button>

            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
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
                      activeId={undefined}
                      stateChanger={setBrandId}
                    />
                  </Form.Group>
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
                  <Form.Group className="mb-3" controlId="formProductQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" value={quantity} onChange={(e) => setQuantity(checkfieldNan(parseFloat(e.target.value)))} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" value={price} onChange={(e) => setPrice(checkfieldNan(parseFloat(e.target.value)))} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductWeight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="text" value={weight} onChange={(e) => setWeight(checkfieldNan(parseFloat(e.target.value)))} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductEan">
                    <Form.Label>EAN:</Form.Label>
                    <Form.Control type="text" value={ean} onChange={(e) => setEan(e.target.value)} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="reset" variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary" onClick={handleSubmit}>
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