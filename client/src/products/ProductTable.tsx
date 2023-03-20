import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import ProductTableRow from './ProductTableRow';
import Table from 'react-bootstrap/Table';

interface Product {
  id: string;
  name: string;
  brand_name: string;
}

const ProductTable: FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<undefined | Product[]>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('http://localhost:5000/products/');
        setProducts(response);
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
  }, []);
 
  if (loading) {
    return (
      <p>Loading...</p>
    )
  } else {
    if (typeof (products) !== 'undefined' && products != null) {
      return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
              </tr>
            </thead>
            <tbody>
              {
                products
                  .map(product =>
                    <ProductTableRow key={product.id} product={product} />
                  )
              }
            </tbody>
          </Table>
      )
    } else {
      return (
        <p>No results found</p>
      )
    }
  }
}

export default ProductTable;