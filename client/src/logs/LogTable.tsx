import { FC, useState, useEffect } from 'react';
import axiosClient from "../axios/axiosInstance"
import Table from 'react-bootstrap/Table';
import { Log } from "../common/types";
import TablePagination from "../pagination/TablePagination";
import Filters from '../filters/Filters';
import Button from 'react-bootstrap/esm/Button';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LogTableRow from './LogTableRow';
import axios from 'axios';
import LoadingModal from '../global/LoadingPopup';

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
  const [itemLimit, setItemLimit] = useState(itemLim)
  const [searchLoading, setSearchLoading] = useState(false);
  const loadingIcon = <FontAwesomeIcon size='4x' className="spinner mx-1 icon-muted" icon={faSpinner} />;

  const handleSearch = (search: string) => {
    setSearchLoading(true);
    setSearchQuery(search);
    setActiveNumPage(1);
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
        const config = {
          headers: {
            'X-Cancel-Request': true,
          },
        };
        const { data: response } = await axiosClient.get(pageRequestURL);
        setLogs(response);
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
          setLogs(undefined)
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
      <Row className="flex-column flex-sm-row">
        <Col className="flex-sm-grow-1">
          <Filters filterType={"logs"} onSearch={handleSearch} />
        </Col>
      </Row>

      {loading && !searchLoading && <LoadingModal show={loading} />}
      {loading && searchLoading && loadingIcon}
      {!searchLoading && (
        <>
          <Table striped className="table-data">
            <thead>
              <tr>
                <th>משתמש</th>
                <th>מוצר</th>
                <th>פעולה</th>
                <th>חדש</th>
                <th>ישן</th>
                <th>זמן</th>
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
          {typeof logs !== "undefined" && <TablePagination
            active={activeNumPage}
            totalPages={resultNumPages}
            setActiveNumPage={setActiveNumPage}
          />}
        </>)}
      {!loading && typeof logs === "undefined" && (
        <p>לא נמצאו תוצאות :'(</p>
      )}
    </>)
}
export default LogTable;