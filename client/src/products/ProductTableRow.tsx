import { FC, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Product, Category } from "../common/types";

import CategorySelect from "../categories/CategorySelect";
import BrandSelect from '../brands/BrandSelect';

interface Props {
    product: Product,
    refreshData: Function
};

const ProductTableRow: FC<Props> = ({ product, refreshData }) => {
    const editIcon = <FontAwesomeIcon icon={faPencil} />

    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [categories, setCategories] = useState<undefined | Category[]>();
    const [category_name, setCategory] = useState(product.category_name);
    const [category_id, setCategoryId] = useState(product.category_id);
    const [brand_name, setBrand] = useState(product.brand_name);
    const [brand_id, setBrandId] = useState(product.brand_id);

  const [activeValue, setActiveValue] = useState<number>();

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
            brand_id: brand_id,
            category_name: category_name,
            category_id: category_id
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

                            {/* TODO: add onchange handlers */}
                            <Form.Group controlId="formProductBrand">
                                <Form.Label>Brand</Form.Label>
                                <BrandSelect
                                    activeId={brand_id}
                                    stateChanger={setBrandId}
                                />
                            </Form.Group>

                            {/* TODO: update categories by state's brand ID */}
                            <Form.Group controlId="formProductCategory">
                                <Form.Label>Category</Form.Label>
                                <CategorySelect
                                    activeId={category_id}
                                    brandId={brand_id}
                                    categories={categories}
                                    stateChanger={setCategoryId}
                                    listChanger={setCategories}
                                />
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
                                value={quantity}
                                type="number"
                                min="0" step="1"
                                onChange={(e) => setQuantity(parseFloat(e.target.value))} 
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