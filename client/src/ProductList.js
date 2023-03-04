import React from 'react';
import axios from 'axios';

export default class ProductList extends React.Component {
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
      <ul>
        {
          this.state.products
            .map(product =>
              <li key={product.id}>{product.name}</li>
            )
        }
      </ul>
    )
  }
}
