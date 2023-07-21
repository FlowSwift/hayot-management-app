import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form, Row } from 'react-bootstrap';
import { Product } from '../common/types';
import axiosClient from "../axios/axiosInstance"
import { UserData } from '../auth/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
  const [saving, setSaving] = useState(false);
  const loadingIcon = <FontAwesomeIcon className="spinner mx-1" icon={faSpinner} />;
  const [errorMessage, setErrorMessage] = useState('');

  const updateProduct = async () => {
    try {
      const { data: response } = await axiosClient.put(axiosClient.defaults.baseURL + '/products/',
        { ...product, quantity: product.quantity + quantity, old_quantity: originalQuantity });
    }
    catch (error) {
      console.log("DATABASE ERROR: ");
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirm = async () => {
    if (saving) return;
    if (!quantity) {
      setErrorMessage("הכנס כמות שונה מאפס");
      return;
    }
    setSaving(true);
    await updateProduct();
    onConfirm();
    setShow(false);
  };

  const handleCancel = () => {
    onCancel();
    setShow(false);
  };

  return (
    <Modal className="modal-small mx-auto" show={show} onHide={handleCancel} backdrop={saving ? "static" : true} keyboard={!saving} centered>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              כמות נוכחית, {product.quantity}
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              עדכן מלאי:
            </Col>
          </Row>
          <Row className='my-3'>
            <Col className='mx-5'>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              {errorMessage && <div className="text-danger">{errorMessage}</div>}
            </Col>
          </Row>
          <Row>
            <Col>
              מלאי עדכני = <strong>{product.quantity + quantity}</strong>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel} disabled={saving}>
          ביטול
        </Button>
        <Button variant="primary" onClick={handleConfirm} disabled={saving}>
          אישור {saving && loadingIcon}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationPopup;
