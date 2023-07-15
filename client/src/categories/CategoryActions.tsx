import { FC, useEffect, useState } from "react"
import { Category } from "../common/types"
import axiosClient from "../axios/axiosInstance"
import { Row, Col, Modal, Button, Form } from "react-bootstrap"
import BrandSelect from "../brands/BrandSelect"
import AnimalSelect from "../animals/AnimalSelect"

interface Props {
  actionType: string
  handleAddCategory: Function
  isShow: boolean
  selectedCategory?: Category
};

const CategoryActions: FC<Props> = ({ actionType, handleAddCategory, isShow, selectedCategory = undefined }) => {
  const [name, setName] = useState("");
  const [brand_id, setBrandId] = useState(0);
  const [animal_id, setAnimalId] = useState(0);

  const handleClose = () => {
    handleAddCategory(false);
  }
  // Prevent page from redirecting when user hits Enter
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await handleSave();
    handleClose();
  }

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
      setBrandId(selectedCategory.brand_id);
      setAnimalId(selectedCategory.animal_id)
    } else {
      resetForm();
    }
  }, [selectedCategory]);

  const resetForm = () => {
    setName("");
    setBrandId(0);
    setAnimalId(0)
  }

  const handleSave = async () => {
    let category = {
      id: selectedCategory?.id,
      name: name,
      brand_id: brand_id,
      animal_id: animal_id
    };
    console.log(category);

    try {
      if (actionType === "Add Category") {
        const { data: response } = await axiosClient.post(axiosClient.defaults.baseURL + '/categories/',
          category);
      } else if (actionType === "Edit Category") {
        const { data: response } = await axiosClient.put(axiosClient.defaults.baseURL + '/categories/',
          category);
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
                  <Form.Group className="mb-3" controlId="formProductBrand">
                    <Form.Label>Brand</Form.Label>
                    <BrandSelect
                      activeId={brand_id}
                      stateChanger={setBrandId}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductBrand">
                    <Form.Label>Animal</Form.Label>
                    <AnimalSelect
                      activeId={animal_id}
                      stateChanger={setAnimalId}
                    />
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

export default CategoryActions;