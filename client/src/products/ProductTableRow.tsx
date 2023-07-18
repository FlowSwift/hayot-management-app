import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Product, Category } from "../common/types";
import { Col, Form, Row } from 'react-bootstrap';
import ConfirmationPopup from '../global/ConfirmPopup';
import { UserData } from '../auth/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faWeight } from '@fortawesome/free-solid-svg-icons'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'

interface Props {
    product: Product,
    handleEditProduct: Function
    handleEditQuantity: Function
    user: UserData
};

const ProductTableRow: FC<Props> = ({ product, handleEditProduct, handleEditQuantity, user }) => {
    const [quantity, setQuantity] = useState(product.quantity);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleOpen = () => handleEditProduct(product);
    const editIcon = <FontAwesomeIcon icon={faPencil} />;
    const weightIcon = <FontAwesomeIcon className="icon-muted" icon={faWeight} />;
    const quantityIcon = <FontAwesomeIcon className="icon-muted" icon={faBagShopping} />;

    const handleConfirmDelete = () => {
        handleEditQuantity()
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <tr>
            <td>{product.brand_name}</td>
            <td>{product.category_name}</td>
            <td>
                <Button variant="link" onClick={handleOpen}>{product.name} <span className="text-muted">({product.id})</span> </Button>
            </td>
            <td>{weightIcon} {product.weight}kg</td>
            <td>
                <Form>
                    <Row className="align-items-center">
                        <Col xs="auto">
                        {quantityIcon} {product.quantity}
                            <Button className="mx-1" variant="outline-primary" size="sm" onClick={() => setShowConfirmation(true)}>
                                {editIcon}
                            </Button>
                        </Col>
                    </Row>
                </Form>
                {showConfirmation && (
                    <ConfirmationPopup
                        user={user}
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