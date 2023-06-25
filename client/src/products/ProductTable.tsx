import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import ProductTableRow from './ProductTableRow';
import Table from 'react-bootstrap/Table';
import { Product } from "../common/types";
import TablePagination from "../pagination/TablePagination";

const ProductTable: FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<undefined | Product[]>();
  const [resultNumPages, setResultNumPages] = useState<number>();
  const resultLimit = 25;
  let resultActivePage = 1;

  const refreshData = () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(`http://localhost:5000/products/?limit=${resultLimit}&?offset=${resultActivePage}`);
        setProducts(response);

        // need a way to determine total number of results for pagination
        // getProductsResultCount.
        const { data: resCount } = await axios.get(`http://localhost:5000/products/count`);
        console.log(resCount)
        setResultNumPages(Math.ceil(resCount / resultLimit));
      } catch (error) {
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
  }, []);
 
  if (loading) {
    return (
      <p>Loading...</p>
    )
  } else {
    if (typeof (products) !== 'undefined' && products != null) {
      return (
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Quantity</th>
                <th>ean</th>
                <th>category_name</th>
                <th>weight</th>
              </tr>
            </thead>
            <tbody>
              {
                products
                  .map(product =>
                    <ProductTableRow 
                    key={product.id} 
                    product={product} 
                    refreshData={refreshData}
                    />
                  )
              }
            </tbody>
          </Table>
          <TablePagination active={resultActivePage} totalPages={resultNumPages} />
        </>
      )
    } else {
      return (
        <p>No results found</p>
      )
    }
  }
}

export default ProductTable;