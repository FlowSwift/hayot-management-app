import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, Form } from 'react-bootstrap';

interface Product {
    id: string;
    name: string;
    brand_name: string;
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
            <td>{product.id}</td>
            <td>
                <Button variant="primary" onClick={handleOpen}>{editIcon}</Button> {product.name}

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
            <td>{product.brand_name}</td>
        </tr>
    )
}

export default ProductTableRow;