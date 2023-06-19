import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, Form } from 'react-bootstrap';
import { Brand } from "../common/types";

interface Props {
    brand: Brand
};

const BrandTableRow: FC<Props> = ({ brand }) => {
    const editIcon = <FontAwesomeIcon icon={faPencil} />
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(brand.name);

    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);

    const handleSave = () => {
        // Submit edited brand details to server
        handleClose();
    };

    return (
        <tr>
            <td>{brand.id}</td>
            <td>
                <Button variant="primary" onClick={handleOpen}>{editIcon}</Button> {brand.name}

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formProductName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
        </tr>
    )
}

export default BrandTableRow;