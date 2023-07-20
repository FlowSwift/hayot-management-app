import { FC, useState, useEffect } from 'react';
import axiosClient from "../axios/axiosInstance"
import { Brand } from "../common/types";
import Form from 'react-bootstrap/Form';

interface Props {
  activeId: number | undefined; // New products
  stateChanger: Function;
  setBrandsLoading: Function;
};

const BrandSelect: FC<Props> = ({ activeId, stateChanger, setBrandsLoading }) => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<undefined | Brand[]>();

  // const [activeValue, setActiveValue] = useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setBrandsLoading(true);
      try {
        const { data: response } = await axiosClient.get(axiosClient.defaults.baseURL + '/brands/');
        setBrands(response);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('Unexpected error', error);
        }
      }
      // setActiveValue(activeId);
      // {this.props.handler}
      setLoading(false);
      setBrandsLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <p>Loading...</p>
    )
  } else {
    const defaultOption = <option key="undefinedBrand" value={0}>---------</option>
    if (typeof (brands) !== 'undefined' && brands != null) {
      const options = brands.map((brand) => {
        return <option key={brand.id} value={brand.id}>{brand.name}</option>
      })
      return (
        <Form.Select value={activeId} onChange={(e) => stateChanger(parseInt(e.target.value))}>
          {defaultOption}
          {options}
        </Form.Select>
      )
    } else {
      return (
        <Form.Select>
          {defaultOption}
        </Form.Select>
      )
    }
  }
}

export default BrandSelect;