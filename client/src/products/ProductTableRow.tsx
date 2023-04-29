import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

interface Product {
    id: string;
    name: string;
    category_name: string;
    brand_name: string;
    ean: string;
    price: number;
}

interface Props {
    product: Product
};

const ProductTableRow: FC<Props> = ({ product }) => {
    const editIcon = <FontAwesomeIcon icon={faPencil} />
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(product.name);
    const [brand_name, setBrand] = useState(product.brand_name);

    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);

    const handleSave = () => {
        // Submit edited product details to server
        handleClose();
    };

    return (
        <tr>
            <td className="align-middle">
                <span className="text-muted">#{product.id}</span> <Button variant="link" onClick={handleOpen}>{product.name}</Button>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formProductName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formProductBrand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control as="textarea" value={brand_name} onChange={(e) => setBrand(e.target.value)} />
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
            </td>
            <td className="align-middle">{product.brand_name}</td>
            <td className="align-middle">
                <Form>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="amountInput" visuallyHidden>
                                Qty
                            </Form.Label>
                            <Form.Control
                                id="amountInput"
                                placeholder="0"
                                type="number"
                                min="0" step="1"
                            />

                        </Col>
                    </Row>
                </Form>
            </td>
            <td className="align-middle">{product.ean}</td>
            <td className="align-middle">{product.category_name}</td>
            <td className="align-middle">{product.price}</td>
        </tr>
    )
}

export default ProductTableRow;