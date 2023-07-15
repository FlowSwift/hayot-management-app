import { FC, useEffect, useState } from "react"
import { Brand } from "../common/types"
import axiosClient from "../axios/axiosInstance"
import { Row, Col, Modal, Button, Form } from "react-bootstrap"

interface Props {
    actionType: string
    handleAddBrand: Function
    isShow: boolean
    selectedBrand?: Brand
};

const BrandActions: FC<Props> = ({ actionType, handleAddBrand, isShow, selectedBrand = undefined }) => {
    const [name, setName] = useState("");

    const handleClose = () => {
        handleAddBrand(false);
    }
    // Prevent page from redirecting when user hits Enter
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await handleSave();
        handleClose();
    }

    useEffect(() => {
        if (selectedBrand) {
            setName(selectedBrand.name);
        } else {
            resetForm();
        }
    }, [selectedBrand]);

    const resetForm = () => {
        setName("");
    }

    const handleSave = async () => {
        let brand = {
            id: selectedBrand?.id,
            name: name,
        };
        console.log(brand);

        try {
            if (actionType === "Add Brand") {
                const { data: response } = await axiosClient.post(axiosClient.defaults.baseURL + '/brands/',
                    brand);
            } else if (actionType === "Edit Brand") {
                const { data: response } = await axiosClient.put(axiosClient.defaults.baseURL + '/brands/',
                    brand);
            }
        }
        catch (error) {
            console.log("DATABASE ERROR: ")
            console.log(error)
        }
        resetForm()
    };
    return (
        <div>
            <Form>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Modal show={isShow} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{actionType}</Modal.Title>
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
                                <Button type="reset" variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button type="submit" variant="primary" onClick={handleSubmit}>
                                    {actionType}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default BrandActions;