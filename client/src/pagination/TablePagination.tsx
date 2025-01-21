import React, { FC } from 'react';
import Pagination from 'react-bootstrap/Pagination';

type Props = {
  setActiveNumPage: (pageNumber: number) => void;
  active?: number;
  totalPages?: number;
};

const TablePagination: FC<Props> = ({ setActiveNumPage, active = 1, totalPages = 1 }) => {
  function handleClick(pageNumber: number) {
    setActiveNumPage(pageNumber);
  }

  let items = [];
  let startPage = Math.max(1, active - 2);
  let endPage = Math.min(totalPages, active + 2);

  if (endPage - startPage < 4) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + 4);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - 4);
    }
  }

  items.push(
    <Pagination.First key="first" onClick={() => handleClick(1)} disabled={active === 1} />
  );

  items.push(
    <Pagination.Prev key="prev" onClick={() => handleClick(active - 1)} disabled={active === 1} />
  );

  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
    items.push(
      <Pagination.Item key={pageNumber} active={pageNumber === active} onClick={() => handleClick(pageNumber)}>
        {pageNumber}
      </Pagination.Item>,
    );
  }

  items.push(
    <Pagination.Next key="next" onClick={() => handleClick(active + 1)} disabled={active === totalPages} />
  );

  items.push(
    <Pagination.Last key="last" onClick={() => handleClick(totalPages)} disabled={active === totalPages} />
  );

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default TablePagination;