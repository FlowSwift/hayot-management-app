import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Animal } from "../common/types";
import Form from 'react-bootstrap/Form';

interface Props {
  activeId: number | undefined; // New products
  stateChanger: Function;
};

const AnimalSelect: FC<Props> = ({ activeId, stateChanger }) => {
  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState<undefined | Animal[]>();

  // const [activeValue, setActiveValue] = useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('http://localhost:5000/animals/');
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
 
  if (loading) {
    return (
      <p>Loading...</p>
    )
  } else {
    const defaultOption = <option key="undefinedAnimal" value="">---------</option>
    if (typeof (animals) !== 'undefined' && animals != null) {
      const options = animals.map((animal) => {
          return <option key={animal.id} value={animal.id}>{animal.type}</option>
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

export default AnimalSelect;