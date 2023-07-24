import { FC, useState, useEffect } from 'react';
import axiosClient from "../axios/axiosInstance"
import Table from 'react-bootstrap/Table';
import { Log } from "../common/types";
import TablePagination from "../pagination/TablePagination";
import Filters from '../filters/Filters';
import Button from 'react-bootstrap/esm/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LogTableRow from './LogTableRow';

interface Props {
  itemLim: number
};

const LogTable: FC<Props> = ({ itemLim }) => {
  const addIcon = <FontAwesomeIcon icon={faPlus} />;
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<undefined | Log[]>();
  const [resultNumPages, setResultNumPages] = useState<number>();
  const [activeNumPage, setActiveNumPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("")
  const [itemLimit, setItemLimit] = useState(itemLim | 15)

  const handleSearch = (search: string) => {
    setSearchQuery(search)
    setActiveNumPage(1)
  };

  const refreshData = () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let pageRequestURL = axiosClient.defaults.baseURL + '/logs/'
        if (searchQuery.trim() != "") {
          pageRequestURL += `/productName/${searchQuery}`
        }
        pageRequestURL += `?limit=${itemLimit}`;
        if (activeNumPage > 1) {
          // Offset is page number * num per page
          pageRequestURL += `&offset=${itemLimit * (activeNumPage - 1)}`;
        }
        const { data: response } = await axiosClient.get(pageRequestURL);
        setLogs(response);

        // Determine total number of results for pagination
        let resCount = 0;
        if (response !== 'undefined') {
          resCount = response[0].total_count;
        }
        setResultNumPages(Math.ceil(resCount / itemLimit));
      } catch (error) {
        setLogs(undefined)
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
          <Filters filterType={"logs"} onSearch={handleSearch} />
        </Col>
      </Row>
      {loading && (<p>Loading...</p>)}
      {!loading && typeof logs !== "undefined" && (
        <>
          <Table striped size="sm" className="table-data">
            <thead>
              <tr>
                <th>משתמש</th>
                <th>מוצר</th>
                <th>Action</th>
                <th>New</th>
                <th>Old</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {
                logs?.map(log =>
                  <LogTableRow key={log.id} log={log} />
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
      {!loading && typeof logs === "undefined" && (
        <p>No results found! :(</p>
      )}
    </>)
}
export default LogTable;