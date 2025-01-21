import { FC, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import ProductTableRow from './ProductTableRow';
import Table from 'react-bootstrap/Table';
import { Product } from "../common/types";
import TablePagination from "../pagination/TablePagination";
import ProductActions from './ProductActions';
import Filters from '../filters/Filters';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axiosClient from "../axios/axiosInstance"
import { UserData } from '../auth/util';
import axios from 'axios';
import LoadingModal from '../global/LoadingPopup';

interface Props {
  itemLim: number,
  user: UserData
};


const ProductTable: FC<Props> = ({ itemLim, user }) => {
  const addIcon = <FontAwesomeIcon icon={faPlus} />;
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  const [selectedEditProduct, setSelectedEditProduct] = useState<Product>();
  const [resultNumPages, setResultNumPages] = useState<number>();
  const [activeNumPage, setActiveNumPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemLimit, setItemLimit] = useState(itemLim);
  const addAction = "הוסף מוצר";
  const editAction = "ערוך מוצר";
  const [actionType, setActionType] = useState(addAction);
  const [brandFilterID, setBrandFilterID] = useState(0);
  const [categoryFilterID, setCategoryFilterID] = useState(0);
  const [isFilterLoading, setIsFilterLoading] = useState(true);
  const loadingIcon = <FontAwesomeIcon className="spinner mx-1" icon={faSpinner} />;

  const handleSearch = (search: string) => {
    setSearchLoading(true);
    setSearchQuery(search);
    setActiveNumPage(1);
  };

  const setAddProductForm = (makeChange: boolean) => {
    if (showAddProductForm) {
      if (makeChange) {
        refreshData();
      }
      setShowAddProductForm(false);
      setSelectedEditProduct(undefined);
    } else {
      setShowAddProductForm(true);
    }
  }

  const handleAddProduct = (makeChange: boolean) => {
    setActionType(addAction);
    setAddProductForm(makeChange);
  };

  const openAddProduct = () => {
    handleAddProduct(false);
  }

  const handleEditProduct = (product: Product, makeChange: boolean) => {
    setActionType(editAction)
    setAddProductForm(makeChange)
    setSelectedEditProduct(product)
  }

  const handleEditQuantity = () => {
    refreshData();
  }

  const refreshData = () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let pageRequestURL = axiosClient.defaults.baseURL + `/products/`;
        let isSearch = searchQuery.trim() !== "";
        if (!isSearch) {
          if (categoryFilterID) pageRequestURL += `category/${categoryFilterID}`;
          else if (brandFilterID) pageRequestURL += `brand/${brandFilterID}`;
        }
        else if (isSearch) {
          pageRequestURL += `name/${searchQuery}`
        }
        pageRequestURL += `?limit=${itemLimit}`;
        if (activeNumPage > 1) {
          // Offset is page number * num per page
          pageRequestURL += `&offset=${itemLimit * (activeNumPage - 1)}`;
        }
        if (isSearch && brandFilterID) {
          pageRequestURL += `&brand_id=${brandFilterID}`;
        }
        const config = {
          headers: {
            'X-Cancel-Request': true,
          },
        };
        const { data: response } = await axiosClient.get(pageRequestURL, config);
        setLoading(false);
        setSearchLoading(false);
        setProducts(response);

        // Determine total number of results for pagination
        let resCount = 0;
        if (response !== 'undefined') {
          resCount = response[0].total_count;
        }
        setResultNumPages(Math.ceil(resCount / itemLimit));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log({ canceled: error.message });
        } else {
          setLoading(false);
          setSearchLoading(false);
          setProducts(undefined)
          if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log('Unexpected error', error);
          }
        }
      }
    }

    fetchData();
  }

  useEffect(() => {
    refreshData();
  }, [activeNumPage,
    searchQuery,
    brandFilterID,
    categoryFilterID
  ]);
  return (
    <>
      <Row className="flex-column flex-sm-row">
        <Col className="flex-sm-grow-1">
          <Filters filterType={"products"} onSearch={handleSearch} setBrandFilter={setBrandFilterID} setCategoryFilter={setCategoryFilterID} setFilterLoading={setIsFilterLoading} activeBrand={brandFilterID} activeCategory={categoryFilterID}/>
        </Col>
        <Col className="flex-sm-grow-0">
          <Button type="button" className="mt-2 mt-sm-0 mb-4 mb-sm-2 text-nowrap" onClick={openAddProduct}>
            {addIcon} הוסף מוצר
          </Button>
        </Col>
      </Row>
      {showAddProductForm && <ProductActions actionType={actionType} handleAddProduct={handleAddProduct} isShow={showAddProductForm} selectedProduct={selectedEditProduct} />}
      {loading && !searchLoading && <LoadingModal show={loading} />}
      {loading && searchLoading && loadingIcon}
      {!searchLoading && (
        <>
          <Table striped className="table-data">
            <thead>
              <tr>
                <th>חברה</th>
                <th>קטגוריה</th>
                <th>שם</th>
                <th>משקל</th>
                <th>כמות</th>
              </tr>
            </thead>
            <tbody>
              {
                products?.map(product =>
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    handleEditProduct={handleEditProduct}
                    handleEditQuantity={handleEditQuantity}
                    user={user}
                  />
                )
              }
            </tbody>
          </Table>
          {typeof products !== "undefined" && <TablePagination
            active={activeNumPage}
            totalPages={resultNumPages}
            setActiveNumPage={setActiveNumPage}
          />}
        </>)}
      {!loading && typeof products === "undefined" && (
        <p>לא נמצאו תוצאות :(</p>
      )}
    </>)
}

export default ProductTable;