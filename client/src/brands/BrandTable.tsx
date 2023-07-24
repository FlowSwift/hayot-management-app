import { FC, useState, useEffect } from 'react';
import axiosClient from "../axios/axiosInstance"
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
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import LoadingModal from '../global/LoadingPopup';

interface Props {
  itemLim: number
};

const BrandTable: FC<Props> = ({ itemLim }) => {
  const addIcon = <FontAwesomeIcon icon={faPlus} />;
  const [showAddBrandForm, setShowAddBrandForm] = useState(false);
  const [selectedEditBrand, setSelectedEditBrand] = useState<Brand>();
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [brands, setBrands] = useState<Brand[]>();
  const [resultNumPages, setResultNumPages] = useState<number>();
  const [activeNumPage, setActiveNumPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("")
  const [itemLimit, setItemLimit] = useState(itemLim | 15)
  const addAction = "Add Brand";
  const editAction = "Edit Brand";
  const [actionType, setActionType] = useState(addAction)
  const loadingIcon = <FontAwesomeIcon size='4x' className="spinner mx-1 icon-muted" icon={faSpinner} />;

  const handleSearch = (search: string) => {
    setSearchLoading(true);
    setSearchQuery(search);
    setActiveNumPage(1);
  };

  const setAddBrandForm = (makeChange: boolean) => {
    if (showAddBrandForm) {
      if (makeChange) {
        refreshData();
      }
      setShowAddBrandForm(false);
      setSelectedEditBrand(undefined);
    } else {
      setShowAddBrandForm(true);
    }
  }

  const handleAddBrand = (makeChange: boolean) => {
    setActionType(addAction);
    setAddBrandForm(makeChange);

  };

  const openAddBrand = () => {
    handleAddBrand(false);
  }

  const handleEditBrand = (brand: Brand, makeChange: boolean) => {
    setActionType(editAction);
    setAddBrandForm(makeChange);
    setSelectedEditBrand(brand);
  }

  const refreshData = () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let pageRequestURL = axiosClient.defaults.baseURL + '/brands/'
        if (searchQuery.trim() != "") {
          pageRequestURL += `name/${searchQuery}`
        }
        pageRequestURL += `?limit=${itemLimit}`;
        if (activeNumPage > 1) {
          // Offset is page number * num per page
          pageRequestURL += `&offset=${itemLimit * (activeNumPage - 1)}`;
        }
        const config = {
          headers: {
            'X-Cancel-Request': true,
          },
        };
        const { data: response } = await axiosClient.get(pageRequestURL, config);
        setBrands(response);
        setLoading(false);
        setSearchLoading(false);

        // Determine total number of results for pagination
        let resCount = 0;
        if (response !== 'undefined') {
          resCount = response[0].total_count;
        }
        setResultNumPages(Math.ceil(resCount / itemLimit));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log({ canceled: error.message });
        } else {
          setLoading(false);
          setSearchLoading(false);
          setBrands(undefined)
          if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log('Unexpected error', error);
          }
        }
      }
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
          <Button type="button" className="mb-2" onClick={openAddBrand}>
            {addIcon} Add Brand
          </Button>
        </Col>
      </Row>

      {showAddBrandForm && <BrandActions actionType={actionType} handleAddBrand={handleAddBrand} isShow={showAddBrandForm} selectedBrand={selectedEditBrand} />}
      {loading && !searchLoading && <LoadingModal show={loading} />}
      {loading && searchLoading && loadingIcon}
      {!searchLoading && (
        <>
          <Table striped size="sm" className="table-data">
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
          {typeof brands !== "undefined" && <TablePagination
            active={activeNumPage}
            totalPages={resultNumPages}
            setActiveNumPage={setActiveNumPage}
          />}
        </>)}
      {!loading && typeof brands === "undefined" && (
        <p>No results found! :(</p>
      )}
    </>)
}
export default BrandTable;