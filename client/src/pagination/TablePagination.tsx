import { FC } from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface Props {
  active?: number | undefined,
  totalPages?: number | undefined
};

const TablePagination: FC<Props> = ({ active = 1, totalPages = 1 }) => {  
  let items = new Array<any>;

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
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