import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

interface Product {
    id: string;
    name: string;
    brand_name: string;
}

interface Props {
    product: Product
};

const ProductTableRow: FC<Props> = ({ product }) => {
    const element = <FontAwesomeIcon icon={faPencil} />
    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.brand_name}</td>
        </tr>
    )
}

export default ProductTableRow;