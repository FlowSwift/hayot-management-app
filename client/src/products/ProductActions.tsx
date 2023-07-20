import { FC, useState, useEffect } from 'react';
import axiosClient from "../axios/axiosInstance"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { Brand, Category, Product } from "../common/types";
import CategorySelect from "../categories/CategorySelect";
import BrandSelect from '../brands/BrandSelect';
import { Alert } from 'react-bootstrap';

interface Props {
  actionType: string
  handleAddProduct: Function
  isShow: boolean
  selectedProduct?: Product
};

const ProductActions: FC<Props> = ({ actionType, handleAddProduct, isShow, selectedProduct = undefined }) => {
  const addIcon = <FontAwesomeIcon icon={faPlus} />;
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<undefined | Category[]>();
  const [category_id, setCategoryId] = useState(0);
  const [brand_id, setBrandId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [ean, setEan] = useState("");
  const old_quantity = selectedProduct?.quantity
  const [saving, setSaving] = useState(false);
  const [isBrandsLoading, setIsBrandsLoading] = useState(false)
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
  const loadingIcon = <FontAwesomeIcon className="spinner mx-1" icon={faSpinner} />;
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [firstSubmit, setFirstSubmit] = useState(true);
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [validationCheck, setValidationCheck] = useState(false);

  const handleOpen = () => null;
  const handleClose = () => {
    finishModal(false);
  }

  const handleValidation = () => {
    let check = true;
    if (name.trim() === "") {
      setNameError("נא הכנס שם.");
      check = false;
    }
    if (category_id === undefined || category_id <= 0) {
      setCategoryError("Please enter a category");
      check = false;
    }
    if (quantity <= 0) {
      setQuantityError("Please enter a quantity higher than 0")
      check = false;
    }
    if (price <= 0) {
      setPriceError("Please enter a price higher than 0")
      check = false;
    }
    if (weight <= 0) {
      setWeightError("Please enter a weight higher than 0")
      check = false;
    }
    return check;
  }

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
    handleAddProduct(makeChange);
  }

  const checkfieldNan = (value: number) => {
    if (isNaN(value)) {
      return 0;
    }
    return value;
  }

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setBrandId(selectedProduct.brand_id);
      setCategoryId(selectedProduct.category_id);
      setQuantity(selectedProduct.quantity);
      setPrice(selectedProduct.price);
      setWeight(selectedProduct.weight);
      setEan(selectedProduct.ean);
    } else {
      resetForm();
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (submitSuccess) {
      finishModal(true);
      resetForm();
    }
  }, [submitSuccess])

  const resetForm = () => {
    setName("");
    setCategories(undefined);
    setCategoryId(0);
    setBrandId(0);
    setQuantity(0);
    setPrice(0);
    setWeight(0);
    setEan("");
    setSubmitSuccess(false);
    setFirstSubmit(true);
  }

  const handleSave = async () => {
    let prod = {
      id: selectedProduct?.id,
      name: name,
      price: price,
      weight: weight,
      quantity: quantity,
      ean: ean,
      category_id: category_id,
      old_quantity: old_quantity
    };
    console.log(prod);

    try {
      if (actionType === "Add Product") {
        const { data: response } = await axiosClient.post(axiosClient.defaults.baseURL + '/products/',
          prod);
      } else if (actionType === "Edit Product") {
        const { data: response } = await axiosClient.put(axiosClient.defaults.baseURL + '/products/',
          prod);
      }
      setSubmitSuccess(true);
    }
    catch (error) {
      setSubmitSuccess(false);
      console.log("DATABASE ERROR: ");
      console.log(error);
    }
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
                    Error!
                  </Alert>
                }
                <Form>
                  <Form.Group className="mb-3" controlId="formProductName">
                    <Form.Label>שם:  {nameError && <Form.Text className="text-danger">{nameError}</Form.Text>}</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductBrand">
                    <Form.Label>Brand</Form.Label>
                    <BrandSelect
                      activeId={brand_id}
                      stateChanger={setBrandId}
                      setBrandsLoading={setIsBrandsLoading}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductCategory">
                    <Form.Label>Category  {categoryError && <Form.Text className="text-danger">{categoryError}</Form.Text>}</Form.Label>
                    <CategorySelect
                      activeId={category_id}
                      brandId={brand_id}
                      categories={categories}
                      stateChanger={setCategoryId}
                      listChanger={setCategories}
                      setCategoriesLoading={setIsCategoriesLoading}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductQuantity">
                    <Form.Label>Quantity  {quantityError && <Form.Text className="text-danger">{quantityError}</Form.Text>}</Form.Label>
                    <Form.Control type="number" inputMode="numeric" value={!quantity ? "" : quantity} placeholder={!quantity ? "0" : ""} onChange={(e) => setQuantity(checkfieldNan(parseFloat(e.target.value)))} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductPrice">
                    <Form.Label>Price  {priceError && <Form.Text className="text-danger">{priceError}</Form.Text>}</Form.Label>
                    <Form.Control type="number" inputMode="decimal" value={!price ? "" : price} placeholder={!price ? "0" : ""} onChange={(e) => setPrice(checkfieldNan(parseFloat(e.target.value)))} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductWeight">
                    <Form.Label>Weight {weightError && <Form.Text className="text-danger">{weightError}</Form.Text>}</Form.Label>
                    <Form.Control type="number" inputMode="decimal" value={!weight ? "" : weight} placeholder={!weight ? "0" : ""} onChange={(e) => setWeight(checkfieldNan(parseFloat(e.target.value)))} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formProductEan">
                    <Form.Label>EAN</Form.Label>
                    <Form.Control type="text" value={ean} onChange={(e) => setEan(e.target.value)} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="reset" variant="secondary" onClick={handleClose} disabled={saving}>
                  Close
                </Button>
                <Button type="submit" variant="primary" onClick={handleSubmit} disabled={saving || isCategoriesLoading || isBrandsLoading}>
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

export default ProductActions;