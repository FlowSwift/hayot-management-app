import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import BrandTableRow from './BrandTableRow';
import Table from 'react-bootstrap/Table';
import { Brand } from "../common/types";
import TablePagination from "../pagination/TablePagination";

const BrandTable: FC = () => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<undefined | Brand[]>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('http://localhost:5000/brands/');
        setBrands(response);
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
    if (typeof (brands) !== 'undefined' && brands != null) {
      return (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Brand ID</th>
                <th>Brand Name</th>
              </tr>
            </thead>
            <tbody>
              {
                brands
                  .map(brand =>
                    <BrandTableRow key={brand.id} brand={brand} />
                  )
              }
            </tbody>
          </Table>          
          <TablePagination />
        </>
      )
    } else {
      return (
        <p>No results found</p>
      )
    }
  }
}

export default BrandTable;