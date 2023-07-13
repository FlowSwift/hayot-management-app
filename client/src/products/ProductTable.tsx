import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ProductTableRow from './ProductTableRow';
import Table from 'react-bootstrap/Table';
import { Product } from "../common/types";
import TablePagination from "../pagination/TablePagination";
import ProductActions from './ProductActions';
import Filters from '../filters/Filters';
import Button from 'react-bootstrap/Button';

interface Props {
  itemLim: number
};


const ProductTable: FC<Props> = ({ itemLim }) => {
  const addIcon = <FontAwesomeIcon icon={faPlus} />;
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<undefined | Product[]>();
  const [selectedEditProduct, setSelectedEditProduct] = useState<Product>();
  const [resultNumPages, setResultNumPages] = useState<number>();
  const [activeNumPage, setActiveNumPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("")
  const [itemLimit, setItemLimit] = useState(itemLim | 15)
  const addAction = "Add Product";
  const editAction = "Edit Product";
  const [actionType, setActionType] = useState(addAction)

  const handleSearch = (search: string) => {
    setSearchQuery(search)
    setActiveNumPage(1)
  };

  const setAddProductForm = () => {
    if (showAddProductForm) {
      refreshData();
      setShowAddProductForm(false);
      setSelectedEditProduct(undefined)
    } else {
      setShowAddProductForm(true);
    }
  }

  const handleAddProduct = () => {
    setActionType(addAction)
    setAddProductForm()
  };

  const handleEditProduct = (product: Product) => {
    setActionType(editAction)
    setAddProductForm()
    setSelectedEditProduct(product)
  }

  const handleEditQuantity = () => {
    refreshData();
  }

  const refreshData = () => {
    const fetchData = async () => {
      console.log(searchQuery)
      setLoading(true);
      try {
        let pageRequestURL = `http://localhost:5000/products/`;
        if (searchQuery.trim() != "") {
          pageRequestURL += `name/${searchQuery}`
        }
        pageRequestURL += `?limit=${itemLimit}`;
        if (activeNumPage > 1) {
          // Offset is page number * num per page
          pageRequestURL += `&offset=${itemLimit * (activeNumPage - 1)}`;
        }
        const { data: response } = await axios.get(pageRequestURL);
        setProducts(response);

        // Determine total number of results for pagination
        let resCount = 0;
        if (response !== 'undefined') {
          resCount = response[0].total_count;
        }
        setResultNumPages(Math.ceil(resCount / itemLimit));
      } catch (error) {
        setProducts(undefined)
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('Unexpected error', error);
        }
      }
      setLoading(false);
    }

    fetchData();
  }

  useEffect(() => {
    refreshData();
  }, [activeNumPage,
    searchQuery
  ]);
  return (
    <>
      <Filters filterType={"products"} onSearch={handleSearch} />
      <Button type="button" className="mb-2" onClick={handleAddProduct}>
        {addIcon} Add Product
      </Button>
      {showAddProductForm && <ProductActions actionType={actionType} handleAddProduct={handleAddProduct} isShow={showAddProductForm} selectedProduct={selectedEditProduct} />}
      {loading && (<p>Loading...</p>)}
      {!loading && typeof products !== "undefined" && (
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>category_name</th>
                <th>weight</th>
                <th>Quantity</th>
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
                  />
                )
              }
            </tbody>
          </Table>
          <TablePagination
            active={activeNumPage}
            totalPages={resultNumPages}
            setActiveNumPage={setActiveNumPage}
          />
        </>)}
      {!loading && typeof products === "undefined" && (
        <p>No results found! :(</p>
      )}
    </>)
}

export default ProductTable;