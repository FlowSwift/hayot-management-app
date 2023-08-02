import { FC, useEffect, useState } from "react"
import { Category } from "../common/types"
import axiosClient from "../axios/axiosInstance"
import { Row, Col, Modal, Button, Form, Alert } from "react-bootstrap"
import BrandSelect from "../brands/BrandSelect"
import AnimalSelect from "../animals/AnimalSelect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

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
  const [nameError, setNameError] = useState("");
  const [firstSubmit, setFirstSubmit] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isBrandsLoading, setIsBrandsLoading] = useState(false)
  const [isAnimalsLoading, setIsAnimalsLoading] = useState(false)
  const loadingIcon = <FontAwesomeIcon className="spinner mx-1" icon={faSpinner} />;

  const handleClose = () => {
    handleAddCategory(false);
    finishModal(false);
  }

  const handleValidation = () => {
    let check = true;
    if (name.trim() === "") {
      setNameError("נא הכנס שם.");
      check = false;
    }
    return check;
  }

  // Prevent page from redirecting when user hits Enter
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    if (saving) return;
    setSaving(true);
    if (handleValidation()) {
      await handleSave();
      setFirstSubmit(false); // set after call to show popup only in case of error
    }
    setFirstSubmit(false);
    setSaving(false);
  }

  const finishModal = (makeChange: boolean) => {
    handleAddCategory(makeChange);
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

  useEffect(() => {
    if (submitSuccess) {
      finishModal(true);
      resetForm();
    }
  }, [submitSuccess])

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
      setSubmitSuccess(true);
    }
    catch (error) {
      setSubmitSuccess(false);
      console.log("DATABASE ERROR: ")
      console.log(error)
    }
    resetForm();
  };
  return (
    <div>
      <Form>
        <Row className="align-items-center">
          <Col xs="auto">
            <Modal show={isShow} onHide={handleClose} backdrop={saving ? "static" : true} keyboard={!saving} centered>
              <Modal.Header closeButton>
                <Modal.Title>{actionType}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {
                  !firstSubmit && !submitSuccess &&
                  <Alert variant={"danger"}>
                    שגיאה!
                  </Alert>
                }
                <Form>
                  <Form.Group className="mb-3" controlId="formProductName">
                    <Form.Label>שם{nameError && <Form.Text className="text-danger">{nameError}</Form.Text>}</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductBrand">
                    <Form.Label>חברה</Form.Label>
                    <BrandSelect
                      activeId={brand_id}
                      stateChanger={setBrandId}
                      setBrandsLoading={setIsBrandsLoading}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductBrand">
                    <Form.Label>חיה</Form.Label>
                    <AnimalSelect
                      activeId={animal_id}
                      stateChanger={setAnimalId}
                      setAnimalsLoading={setIsAnimalsLoading}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="reset" variant="secondary" onClick={handleClose} disabled={saving}>
                  סגור
                </Button>
                <Button type="submit" variant="primary" onClick={handleSubmit} disabled={saving || isBrandsLoading || isAnimalsLoading}>
                  {actionType} {saving && loadingIcon}
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