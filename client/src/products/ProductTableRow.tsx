import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Product, Category } from "../common/types";
import { Col, Form, Row } from 'react-bootstrap';
import ConfirmationPopup from '../global/ConfirmPopup,tsx';

interface Props {
    product: Product,
    handleEditProduct: Function
    handleEditQuantity: Function
};
const ProductTableRow: FC<Props> = ({ product, handleEditProduct, handleEditQuantity}) => {
    const [quantity, setQuantity] = useState(product.quantity);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleOpen = () => handleEditProduct(product);

    const handleConfirmDelete = () => {
        handleEditQuantity()
        setShowConfirmation(false);
      };
    
      const handleCancelDelete = () => {
        setShowConfirmation(false);
      };

    return (
        <tr>
            <td className="align-middle">
                <span className="text-muted">#{product.id}</span> <Button variant="link" onClick={handleOpen}>{product.name}</Button>

            </td>
            <td className="align-middle">{product.brand_name}</td>
            <td className="align-middle">{product.category_name}</td>
            <td className="align-middle">{product.weight}</td>
            <td className="align-middle">
                <Form>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Control
                                className="small-input"
                                value={quantity}
                                type="number"
                                min="0"
                                step="1"
                                onChange={(e) => setQuantity(parseFloat(e.target.value))}
                            />
                        </Col>
                        <Col xs="auto">
                            <Button variant="outline-primary" size="sm" onClick={() => setShowConfirmation(true)}>
                                ✓
                            </Button>
                        </Col>
                    </Row>
                </Form>
                {showConfirmation && (
                    <ConfirmationPopup
                        message="Are you sure you want to delete?"
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                        product={product}
                    />
                )}
            </td>
        </tr>
    )
}

export default ProductTableRow;