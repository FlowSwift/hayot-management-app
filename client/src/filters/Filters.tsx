import React from "react";
import SearchBar from "./SearchBar";
import BrandSelect from "../brands/BrandSelect";
import FilterCategorySelect from "./FilterCategorySelect";
// import DropdownMenu from "./DropdownMenu";

type FiltersProps = {
  filterType: string;
  onSearch: (query: string) => void;
  setCategoryFilter?: Function;
  setBrandFilter?: Function;
  setFilterLoading?: Function;
  activeCategory?: number;
  activeBrand?: number;
};

const Filters: React.FC<FiltersProps> = ({ filterType, onSearch, setBrandFilter, setCategoryFilter, setFilterLoading, activeBrand, activeCategory }) => {
  const handleSearch = (searchQuery: string) => {
    onSearch(searchQuery);
  };

  return (
    <>
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div>
        {/* {filterType === "products" && <DropdownMenu options={["a", "b", "c"]} />} */}
        {filterType === "products" &&
          <>
            <BrandSelect
              activeId={activeBrand}
              stateChanger={setBrandFilter ?? (() => { })}
              setBrandsLoading={setFilterLoading ?? (() => { })}
            />
            <FilterCategorySelect
              activeId={activeCategory}
              brandId={activeBrand}
              stateChanger={setCategoryFilter ?? (() => { })}
              setCategoriesLoading={setFilterLoading ?? (() => { })}
            />
          </>
        }
      </div>
    </>
  );
};

export default Filters;