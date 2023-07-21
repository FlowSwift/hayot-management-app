import { FC, useState, useEffect } from 'react';
import axiosClient from "../axios/axiosInstance"
import { Animal } from "../common/types";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Props {
  activeId: number | undefined; // New products
  stateChanger: Function;
};

const AnimalSelect: FC<Props> = ({ activeId, stateChanger }) => {
  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState<undefined | Animal[]>();
  const loadingIcon = <FontAwesomeIcon className="spinner mx-1" icon={faSpinner} />;

  // const [activeValue, setActiveValue] = useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axiosClient.get(axiosClient.defaults.baseURL + '/animals/');
        setAnimals(response);
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
    }

    fetchData();
  }, []);


  const defaultOption = <option key="undefinedAnimal" value="">---------</option>
  if (typeof (animals) !== 'undefined' && animals != null) {
    const options = animals.map((animal) => {
      return <option key={animal.id} value={animal.id}>{animal.type}</option>
    })
    return (
      <>
        <Form.Select disabled={loading} value={activeId} onChange={(e) => stateChanger(parseInt(e.target.value))}>
          {defaultOption}
          {options}
        </Form.Select>
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

export default AnimalSelect;