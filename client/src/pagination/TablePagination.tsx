import { FC } from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface Props {
  setActiveNumPage: Function,
  active?: number | undefined,
  totalPages?: number | undefined
};

const TablePagination: FC<Props> = ({ setActiveNumPage, active = 1, totalPages = 1 }) => {  
  function handleClick(pageNumber: number) {
    // Update setActiveNumPage from caller
    setActiveNumPage(pageNumber);
  }

  let items = new Array<any>;

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    items.push(
      <Pagination.Item key={pageNumber} active={pageNumber === active} onClick={() => handleClick(pageNumber)}>
        {pageNumber}
      </Pagination.Item>,
    );
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  )
}

export default TablePagination;    