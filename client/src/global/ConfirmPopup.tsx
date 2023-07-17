import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form, Row } from 'react-bootstrap';
import { Product } from '../common/types';
import axiosClient from "../axios/axiosInstance"
import { UserData } from '../auth/util';

interface ConfirmationProps {
  user: UserData
  message: string;
  onConfirm: Function;
  onCancel: Function;
  product: Product
}

const ConfirmationPopup: React.FC<ConfirmationProps> = ({ user, message, onConfirm, onCancel, product }) => {
  const [show, setShow] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const originalQuantity = product.quantity

  const updateProduct = async () => {
    product.quantity += quantity
    try {
      const { data: response } = await axiosClient.put(axiosClient.defaults.baseURL + '/products/',
        { id: product.id, quantity: product.quantity, old_quantity: originalQuantity });
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
          <Row className='my-3'>
            <Col>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              /> 
            </Col>
            <Col>
              +  
              {product.quantity}
            </Col>
          </Row>
          <Row>
            <Col>
              {product.quantity + quantity} 
              =
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
