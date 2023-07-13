import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form, Row } from 'react-bootstrap';
import { Product } from '../common/types';
import axios from 'axios';

interface ConfirmationProps {
  message: string;
  onConfirm: Function;
  onCancel: Function;
  product: Product
}

const ConfirmationPopup: React.FC<ConfirmationProps> = ({ message, onConfirm, onCancel, product }) => {
  const [show, setShow] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const updateProduct = async () => {
    product.quantity += quantity
    try {
      const { data: response } = await axios.put('http://localhost:5000/products/',
        {id: product.id, quantity: product.quantity});
    }
    catch (error) {
      console.log("DATABASE ERROR: ")
      console.log(error)
    }
  }

  const handleConfirm = async () => {
    await updateProduct();
    onConfirm();
    setShow(false);
  };

  const handleCancel = () => {
    onCancel();
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Body>
        <Form>
          <Row className="align-items-center">
            <Col>
              הכניסו כמות שתרצו להוסיף:
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              {product.quantity + quantity}
            </Col>
            <Col>
              =
            </Col>
            <Col>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </Col>
            <Col>
              +
            </Col>
            <Col>
              {product.quantity}
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          ביטול
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          אישור
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationPopup;