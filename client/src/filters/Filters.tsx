import React from "react";
import SearchBar from "./SearchBar";
// import DropdownMenu from "./DropdownMenu";

type FiltersProps = {
    filterType: string;
    onSearch: (query: string) => void;
};

const Filters: React.FC<FiltersProps> = ({ filterType, onSearch }) => {
    const handleSearch = (searchQuery: string) => {
        onSearch(searchQuery);
      };

    return (
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>
    );
};

export default Filters;