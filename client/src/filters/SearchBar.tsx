import { FC, useState } from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: FC<Props> = ({ onSearch }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    onSearch(e.target.value); // Perform search on every change
  };

  return (
    <div>
      <Form.Label htmlFor="inlineFormInput" visuallyHidden>
        Search
      </Form.Label>
      <Form.Control
        className="mb-2"
        id="inlineFormInput"
        placeholder="Search"
        onChange={handleChange}
        type="search"
      />
    </div>
  );
};

export default SearchBar;