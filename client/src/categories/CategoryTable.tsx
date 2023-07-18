import { FC, useState, useEffect } from 'react';
import axiosClient from "../axios/axiosInstance"
import CategoryTableRow from './CategoryTableRow';
import Table from 'react-bootstrap/Table';
import { Category } from "../common/types";
import TablePagination from "../pagination/TablePagination";
import Filters from '../filters/Filters';
import Button from 'react-bootstrap/esm/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoryActions from './CategoryActions';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Props {
  itemLim: number
};

const CategoryTable: FC<Props> = ({ itemLim }) => {
  const addIcon = <FontAwesomeIcon icon={faPlus} />;
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [selectedEditCategory, setSelectedEditCategory] = useState<Category>();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<undefined | Category[]>();
  const [resultNumPages, setResultNumPages] = useState<number>();
  const [activeNumPage, setActiveNumPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("")
  const [itemLimit, setItemLimit] = useState(itemLim | 15)
  const addAction = "Add Category";
  const editAction = "Edit Category";
  const [actionType, setActionType] = useState(addAction)
  const loadingIcon = <FontAwesomeIcon size='4x' className="spinner mx-1 icon-muted" icon={faSpinner} />;

  const handleSearch = (search: string) => {
    setSearchQuery(search)
    setActiveNumPage(1)
  };

  const setAddCategoryForm = () => {
    if (showAddCategoryForm) {
      refreshData();
      setShowAddCategoryForm(false);
      setSelectedEditCategory(undefined)
    } else {
      setShowAddCategoryForm(true);
    }
  }

  const handleAddCategory = () => {
    setActionType(addAction)
    setAddCategoryForm()

  };

  const handleEditCategory = (category: Category) => {
    setActionType(editAction)
    setAddCategoryForm()
    setSelectedEditCategory(category)
  }

  const refreshData = () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let pageRequestURL = axiosClient.defaults.baseURL + '/categories/'
        if (searchQuery.trim() != "") {
          pageRequestURL += `name/${searchQuery}`
        }
        pageRequestURL += `?limit=${itemLimit}`;
        if (activeNumPage > 1) {
          // Offset is page number * num per page
          pageRequestURL += `&offset=${itemLimit * (activeNumPage - 1)}`;
        }
        const { data: response } = await axiosClient.get(pageRequestURL);
        setCategories(response);

        // Determine total number of results for pagination
        let resCount = 0;
        if (response !== 'undefined') {
          resCount = response[0].total_count;
        }
        setResultNumPages(Math.ceil(resCount / itemLimit));
      } catch (error) {
        setCategories(undefined)
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
          <Filters filterType={"categories"} onSearch={handleSearch} />
        </Col>
        <Col>
          <Button type="button" className="mb-2" onClick={handleAddCategory}>
            {addIcon} {actionType}
          </Button>
        </Col>
      </Row>

      {showAddCategoryForm && <CategoryActions actionType={actionType} handleAddCategory={handleAddCategory} isShow={showAddCategoryForm} selectedCategory={selectedEditCategory} />}
      {loading && (<div className="m-5 text-center">{loadingIcon}</div>)}
      {!loading && typeof categories !== "undefined" && (
        <>
          <Table striped size="sm" className="table-data">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Brand</th>
                <th>Animal</th>
              </tr>
            </thead>
            <tbody>
              {
                categories?.map(category =>
                  <CategoryTableRow key={category.id} category={category} handleEditCategory={handleEditCategory} />
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
      {!loading && typeof categories === "undefined" && (
        <p>No results found! :(</p>
      )}
    </>)
}
export default CategoryTable;