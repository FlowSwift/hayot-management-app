import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Category } from "../common/types";
import Form from 'react-bootstrap/Form';

interface Props {
  activeId: number; // Active category ID
  brandId: number;
};

const CategorySelect: FC<Props> = ({ activeId, brandId }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<undefined | Category[]>();
  const [activeValue, setActiveValue] = useState<number>()  
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setActiveValue(activeId);
      try {
        const { data: response } = await axios.get(`http://localhost:5000/brands/${brandId}/categories/`);
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
      const options = categories.map((category) => {
          return <option key={category.id} value={category.id}>{category.name} ({category.brand_name})</option>
      })
      return (
        <Form.Select defaultValue="Choose..." value={activeValue} onChange={(e) => setActiveValue(parseInt(e.target.value))}>
          {options}
        </Form.Select>
      )
    } else {
      return (
        <p>No results found</p>
      )
    }
  }
}

export default CategorySelect;