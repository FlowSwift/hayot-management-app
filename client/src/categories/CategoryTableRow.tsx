import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Category } from "../common/types";
import ConfirmationPopup from '../global/ConfirmPopup';

interface Props {
    category: Category,
    handleEditCategory: Function
};
const CategoryTableRow: FC<Props> = ({ category, handleEditCategory}) => {
    const handleOpen = () => handleEditCategory(category);
    

    return (
        <tr>
            <td className="align-middle">
                <span className="text-muted">#{category.id}</span> <Button variant="link" className="p-0" onClick={handleOpen}>{category.name}</Button>
            </td>
            <td className="align-middle">{category.brand_name}</td>
            <td className="align-middle">{category.animal_type}</td>
        </tr>
    )
}

export default CategoryTableRow;