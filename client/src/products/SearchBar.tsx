import { FC, useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: FC<Props> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Perform search on every change
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleChange}
      />
      <button type="button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
