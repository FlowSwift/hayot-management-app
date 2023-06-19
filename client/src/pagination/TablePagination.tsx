import { FC } from 'react';
import Pagination from 'react-bootstrap/Pagination';

let active = 1;
let items = new Array<any>;
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const TablePagination: FC = () => {
    return (
        <div>
        <Pagination>{items}</Pagination>
      </div>
    )
}

export default TablePagination;    