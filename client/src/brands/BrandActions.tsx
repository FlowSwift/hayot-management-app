import { FC, useEffect, useState } from "react"
import { Brand } from "../common/types"
import axiosClient from "../axios/axiosInstance"
import { Row, Col, Modal, Button, Form, Alert } from "react-bootstrap"
import BrandSelect from "../brands/BrandSelect"
import AnimalSelect from "../animals/AnimalSelect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

interface Props {
  actionType: string
  handleAddBrand: Function
  isShow: boolean
  selectedBrand?: Brand
};

const BrandActions: FC<Props> = ({ actionType, handleAddBrand, isShow, selectedBrand = undefined }) => {
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
    handleAddBrand(false);
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
    handleAddBrand(makeChange);
  }

  useEffect(() => {
    if (selectedBrand) {
      setName(selectedBrand.name);
    } else {
      resetForm();
    }
  }, [selectedBrand]);

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

export default BrandActions;