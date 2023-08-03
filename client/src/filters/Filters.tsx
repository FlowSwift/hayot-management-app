import React from "react";
import SearchBar from "./SearchBar";
import BrandSelect from "../brands/BrandSelect";
import FilterCategorySelect from "./FilterCategorySelect";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
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
        <Row>
        {/* {filterType === "products" && <DropdownMenu options={["a", "b", "c"]} />} */}
        {filterType === "products" &&
          <>
          <Col xs="auto">
            <BrandSelect
              activeId={activeBrand}
              stateChanger={setBrandFilter ?? (() => { })}
              setBrandsLoading={setFilterLoading ?? (() => { })}
            /></Col>
            <Col xs="auto">
            <FilterCategorySelect
              activeId={activeCategory}
              brandId={activeBrand}
              stateChanger={setCategoryFilter ?? (() => { })}
              setCategoriesLoading={setFilterLoading ?? (() => { })}
            />
            </Col>
          </>
        }
        </Row>
      </div>
    </>
  );
};

export default Filters;