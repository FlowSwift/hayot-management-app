import { FC, useState } from 'react';

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
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;