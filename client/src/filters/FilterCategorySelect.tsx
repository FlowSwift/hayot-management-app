import { FC, useEffect, useState } from 'react';
import axiosClient from "../axios/axiosInstance"
import { Category } from "../common/types";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Props {
  activeId: number | undefined;
  brandId: number | undefined;
  stateChanger: Function;
  setCategoriesLoading: Function;
};

const FilterCategorySelect: FC<Props> = ({ activeId, brandId, stateChanger, setCategoriesLoading }) => {
  const [loading, setLoading] = useState(true);
  const loadingIcon = <FontAwesomeIcon className="spinner mx-1" icon={faSpinner} />;
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  // const [categories, setCategories] = useState<undefined | Category[]>();
  // const [activeValue, setActiveValue] = useState<number>()

  const refreshData = () => {
    const fetchData = async () => {
      setLoading(true);
      setCategoriesLoading(true);
      // setActiveValue(activeId);
      if (brandId !== undefined && brandId !== 0) {
        try {
          const { data: response } = await axiosClient.get(axiosClient.defaults.baseURL + `/brands/${brandId}/categories/`);
          setFilteredCategories(response);
        } catch (error) {
          setFilteredCategories([]);
          if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log('Unexpected error', error);
          }
        }
      } else {
        setFilteredCategories([]);
        stateChanger(0);
      }
      setLoading(false);
      setCategoriesLoading(false);
    }

    fetchData();
  };

  useEffect(() => {
    stateChanger(0);
    refreshData();
  }, [brandId]);

  // if (loading) {
  //   return (
  //     loadingIcon
  //   )
  // } else {
  const defaultOption = <option key="undefinedCategory" value="">---------</option>
  if (filteredCategories.length !== 0) {
    const options = filteredCategories.map((category) => {
      return <option key={category.id} value={category.id}>{category.name} ({category.brand_name})</option>
    })
    return (
      <>
        <div>
          <Form.Select disabled={loading} value={activeId} onChange={(e) => stateChanger(parseInt(e.target.value))}>
            {defaultOption}
            {options}
          </Form.Select>
        </div>
        </>
    )
  } else {
    return (
      <>
      <Form.Select disabled={loading}>
        {defaultOption}
      </Form.Select>
      </>
    )
  }
}
// }

export default FilterCategorySelect;