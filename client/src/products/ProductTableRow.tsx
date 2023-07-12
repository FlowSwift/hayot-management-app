import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Product, Category } from "../common/types";

interface Props {
    product: Product,
    handleEditProduct: Function
};
const ProductTableRow: FC<Props> = ({ product, handleEditProduct }) => {
    const handleOpen = () => handleEditProduct(product);

    return (
        <tr>
            <td className="align-middle">
                <span className="text-muted">#{product.id}</span> <Button variant="link" onClick={handleOpen}>{product.name}</Button>

            </td>
            <td className="align-middle">{product.brand_name}</td>
            <td className="align-middle">
            </td>
            <td className="align-middle">{product.ean}</td>
            <td className="align-middle">{product.category_name}</td>
            <td className="align-middle">{product.weight}</td>
        </tr>
    )
}

export default ProductTableRow;