import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"

export default class ProductTableRow extends React.Component {
    state = {
        product: this.props.product
    }
    
    render() {
      const element = <FontAwesomeIcon icon={faPencil} />
        return (
            <tr>
                <td>{this.state.product.id}</td>
                <td>{this.state.product.name}</td>
                <td>{this.state.product.brand_name}</td>
            </tr>
        )
    }
}