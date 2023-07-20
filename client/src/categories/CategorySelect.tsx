import { FC, useState, useEffect } from 'react';
import axiosClient from "../axios/axiosInstance"
import { Category } from "../common/types";
import Form from 'react-bootstrap/Form';

interface Props {
  activeId: number | undefined; // Active category ID
  brandId: number | undefined; // New products
  categories: undefined | Category[];
  stateChanger: Function;
  listChanger: Function;
  setCategoriesLoading: Function;
};

const CategorySelect: FC<Props> = ({ activeId, brandId, categories, stateChanger, listChanger, setCategoriesLoading }) => {
  const [loading, setLoading] = useState(true);
  // const [categories, setCategories] = useState<undefined | Category[]>();
  // const [activeValue, setActiveValue] = useState<number>()

  const refreshData = () => {
    const fetchData = async () => {
      setLoading(true);
      setCategoriesLoading(true);
      // setActiveValue(activeId);
      if (brandId != undefined && brandId != 0) {
        try {
          const { data: response } = await axiosClient.get(axiosClient.defaults.baseURL + `/brands/${brandId}/categories/`);
          listChanger(response);
        } catch (error) {
          listChanger(undefined)
          if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log('Unexpected error', error);
          }
        }
      } else {
        listChanger(undefined)
      }
      setLoading(false);
      setCategoriesLoading(false);
    }

    fetchData();
  };

  // https://react.dev/learn/synchronizing-with-effects
  // useEffect(() => {
  //   // This runs after every render
  // });

  // useEffect(() => {
  //   // This runs only on mount (when the component appears)
  // }, []);

  // useEffect(() => {
  //   // This runs on mount *and also* if either a or b have changed since the last render
  // }, [a, b]);

  useEffect(() => {
    refreshData();
  }, [brandId]);

  if (loading) {
    return (
      <p>Loading...</p>
    )
  } else {
    const defaultOption = <option key="undefinedCategory" value="">---------</option>
    if (typeof (categories) !== 'undefined' && categories != null) {
      const options = categories.map((category) => {
        return <option key={category.id} value={category.id}>{category.name} ({category.brand_name})</option>
      })
      return (
        <div>
          <Form.Select value={activeId} onChange={(e) => stateChanger(parseInt(e.target.value))}
          // onChange={(e) => setActiveValue(parseInt(e.target.value))}
          >
            {defaultOption}
            {options}
          </Form.Select>
        </div>
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

export default CategorySelect;