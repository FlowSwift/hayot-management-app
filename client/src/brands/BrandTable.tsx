import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import BrandTableRow from './BrandTableRow';
import Table from 'react-bootstrap/Table';
import { Brand } from "../common/types";
import TablePagination from "../pagination/TablePagination";
import Filters from '../filters/Filters';
import Button from 'react-bootstrap/esm/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BrandActions from './BrandActions';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface Props {
  itemLim: number
};

const BrandTable: FC<Props> = ({ itemLim }) => {
  const addIcon = <FontAwesomeIcon icon={faPlus} />;
  const [showAddBrandForm, setShowAddBrandForm] = useState(false);
  const [selectedEditBrand, setSelectedEditBrand] = useState<Brand>();
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<undefined | Brand[]>();
  const [resultNumPages, setResultNumPages] = useState<number>();
  const [activeNumPage, setActiveNumPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("")
  const [itemLimit, setItemLimit] = useState(itemLim | 15)
  const addAction = "Add Brand";
  const editAction = "Edit Brand";
  const [actionType, setActionType] = useState(addAction)

  const handleSearch = (search: string) => {
    setSearchQuery(search)
    setActiveNumPage(1)
  };

  const setAddBrandForm = () => {
    if (showAddBrandForm) {
      refreshData();
      setShowAddBrandForm(false);
      setSelectedEditBrand(undefined)
    } else {
      setShowAddBrandForm(true);
    }
  }

  const handleAddBrand = () => {
    setActionType(addAction)
    setAddBrandForm()

  };

  const handleEditBrand = (brand: Brand) => {
    setActionType(editAction)
    setAddBrandForm()
    setSelectedEditBrand(brand)
  }

  const refreshData = () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let pageRequestURL = 'http://localhost:5000/brands/'
        if (searchQuery.trim() != "") {
          pageRequestURL += `name/${searchQuery}`
        }
        pageRequestURL += `?limit=${itemLimit}`;
        if (activeNumPage > 1) {
          // Offset is page number * num per page
          pageRequestURL += `&offset=${itemLimit * (activeNumPage - 1)}`;
        }
        const { data: response } = await axios.get(pageRequestURL);
        setBrands(response);

        // Determine total number of results for pagination
        let resCount = 0;
        if (response !== 'undefined') {
          resCount = response[0].total_count;
        }
        setResultNumPages(Math.ceil(resCount / itemLimit));
      } catch (error) {
        setBrands(undefined)
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('Unexpected error', error);
        }
      }
      setLoading(false);
    }

    fetchData();
  }

  useEffect(() => {
    refreshData();
  }, [activeNumPage,
    searchQuery
  ]);
  return (
    <>
      <Row>
        <Col className="col-12 col-md-6 col-lg-3">
          <Filters filterType={"brands"} onSearch={handleSearch} />
        </Col>
        <Col>
          <Button type="button" className="mb-2" onClick={handleAddBrand}>
          {addIcon} {actionType}
          </Button>
        </Col>
      </Row>
      {showAddBrandForm && <BrandActions actionType={actionType} handleAddBrand={handleAddBrand} isShow={showAddBrandForm} selectedBrand={selectedEditBrand} />}
      {loading && (<p>Loading...</p>)}
      {!loading && typeof brands !== "undefined" && (
        <>
          <Table striped bordered size="sm">
            <thead>
              <tr>
                <th>Brand Name</th>
              </tr>
            </thead>
            <tbody>
              {
                brands?.map(brand =>
                  <BrandTableRow key={brand.id} brand={brand} handleEditBrand={handleEditBrand} />
                )
              }
            </tbody>
          </Table>
          <TablePagination
            active={activeNumPage}
            totalPages={resultNumPages}
            setActiveNumPage={setActiveNumPage}
          />
        </>)}
      {!loading && typeof brands === "undefined" && (
        <p>No results found! :(</p>
      )}
    </>)
}
export default BrandTable;