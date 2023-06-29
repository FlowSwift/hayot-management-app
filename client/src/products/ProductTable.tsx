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
  const [activeNumPage, setActiveNumPage] = useState(1);
  const resultLimit = 25;

  const refreshData = () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let pageRequestURL = `http://localhost:5000/products/?limit=${resultLimit}`;
        if (activeNumPage > 1) {
           // Offset is page number * num per page
          pageRequestURL = `http://localhost:5000/products/?limit=${resultLimit}&offset=${resultLimit * (activeNumPage - 1) + 1}`;  
        }
        const { data: response } = await axios.get(pageRequestURL);
        setProducts(response);

        // Determine total number of results for pagination
        let resCount = 0;
        if (response  !== 'undefined') {
          resCount = response[0].total_count;
        }
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
  }, [activeNumPage]);
 
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
          <TablePagination 
            active={activeNumPage} 
            totalPages={resultNumPages}
            setActiveNumPage={setActiveNumPage}
            />
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