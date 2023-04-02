import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import CategoryTableRow from './CategoryTableRow';
import Table from 'react-bootstrap/Table';

interface Category {
  id: string;
  name: string;
  brand_name: string;
}

const CategoryTable: FC = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<undefined | Category[]>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('http://localhost:5000/categories/');
        setCategories(response);
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
    if (typeof (categories) !== 'undefined' && categories != null) {
      return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Brand</th>
              </tr>
            </thead>
            <tbody>
              {
                categories
                  .map(category =>
                    <CategoryTableRow key={category.id} category={category} />
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

export default CategoryTable;