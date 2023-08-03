import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Brand } from "../common/types";

interface Props {
    brand: Brand,
    handleEditBrand: Function
};
const BrandTableRow: FC<Props> = ({ brand, handleEditBrand }) => {
    const handleOpen = () => handleEditBrand(brand);


    return (
        <tr>
            <td className="align-middle">
                <span className="text-muted">#{brand.id}</span> <Button variant="link" className="p-0" onClick={handleOpen}>{brand.name}</Button>
            </td>
        </tr>
    )
}

export default BrandTableRow;