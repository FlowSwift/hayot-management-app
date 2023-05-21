import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Brand } from "../common/types";
import Form from 'react-bootstrap/Form';

interface Props {
  activeId: number;
};

const BrandSelect: FC<Props> = ({ activeId }) => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<undefined | Brand[]>();

  const [activeValue, setActiveValue] = useState<number>()

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
      setActiveValue(activeId);
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
      const options = brands.map((brand) => {
          return <option key={brand.id} value={brand.id}>{brand.name}</option>
      })
      return (
        <Form.Select value={activeValue} onChange={(e) => setActiveValue(parseInt(e.target.value))}>
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

export default BrandSelect;