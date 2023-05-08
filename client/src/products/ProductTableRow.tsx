import { FC, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Product } from "../common/types";

import CategorySelect from "../categories/CategorySelect";

interface Props {
    product: Product,
    refreshData: Function
};

const ProductTableRow: FC<Props> = ({ product, refreshData }) => {
    const editIcon = <FontAwesomeIcon icon={faPencil} />

    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [category_name, setCategory] = useState(product.category_name);
    const [category_id, setCategoryId] = useState(3);
    const [brand_name, setBrand] = useState(product.brand_name);
    const [ean, setEan] = useState(product.ean);
    const [quantity, setQuantity] = useState(product.quantity);
    const [price, setPrice] = useState(product.price);
    const [weight, setWeight] = useState(product.weight);

    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);

    const handleSave = async () => {
        const prod = {
            id: id,
            name: name,
            quantity: quantity,
            price: price,
            weight: weight,
            ean: ean,
            brand_name: brand_name,
            category_name: category_name
        };

        // Submit edited product details to server
        try {
            const { data: response } = await axios.put('http://localhost:5000/products/',
                prod);
        }
        catch {

        }
        refreshData();
        handleClose();
    };

    // Modal should use state
    // Table should use passed in params
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
                                <Form.Control type="text" value={brand_name} onChange={(e) => setBrand(e.target.value)} />
                            </Form.Group>

                            <CategorySelect activeId={category_id} />

                            <Form.Group controlId="formProductCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" value={category_name} onChange={(e) => setCategory(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formProductQuantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="text" value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))} />
                            </Form.Group>

                            <Form.Group controlId="formProductPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                            </Form.Group>

                            <Form.Group controlId="formProductWeight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control type="text" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} />
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
                                value={product.quantity}
                                type="number"
                                min="0" step="1"
                            />

                        </Col>
                    </Row>
                </Form>
            </td>
            <td className="align-middle">{product.ean}</td>
            <td className="align-middle">{product.category_name}</td>
            <td className="align-middle">{product.weight}</td>
        </tr>
    )
}

export default ProductTableRow;