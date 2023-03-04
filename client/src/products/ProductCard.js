import React from 'react';

export default class ProductCard extends React.Component {
    // const { products } = this.props;
    state = {
        product: this.props.product
    }

    render() {
        return (
            <li>
                <h3>{this.state.product.name}</h3>
                <p>{this.state.product.brand_name}</p>
            </li>
        )
    }
}
