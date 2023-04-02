import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, Form } from 'react-bootstrap';

interface Category {
    id: string;
    name: string;
    brand_name: string;
}

interface Props {
    category: Category
};

const CategoryTableRow: FC<Props> = ({ category }) => {
    const editIcon = <FontAwesomeIcon icon={faPencil} />
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(category.name);
    const [brand_name, setBrand] = useState(category.brand_name);

    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);

    const handleSave = () => {
        // Submit edited category details to server
        handleClose();
    };

    return (
        <tr>
            <td>{category.id}</td>
            <td>
                <Button variant="primary" onClick={handleOpen}>{editIcon}</Button> {category.name}

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formCategoryName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formCategoryBrand">
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
            <td>{category.brand_name}</td>
        </tr>
    )
}

export default CategoryTableRow;