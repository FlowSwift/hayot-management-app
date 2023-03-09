import React from 'react';
import axios from 'axios';
import ProductTableRow from './ProductTableRow';
import Table from 'react-bootstrap/Table';

export default class ProductTable extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/products/`)
    .then(res => {
      const products = res.data;
      this.setState({ products });
    })
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.products
            .map(product =>
              <ProductTableRow key={product.id} product={product} />
            )
        }
        </tbody>
      </Table>
    )
  }
}
