import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Log } from "../common/types";

interface Props {
    log: Log,
};

const LogTableRow: FC<Props> = ({log}) => {
    
    const timestamp = new Date(log.log_time);

    return (
        <tr>
            <td className="align-middle">
                <span className="text-muted">#{log.id}</span> {log.brand_name}
            </td>
            <td className="align-middle">{log.category_name}</td>
            <td className="align-middle">{log.product_name}</td>
            <td className="align-middle">{log.action_type}</td>
            <td className="align-middle">{log.new_value}</td>
            <td className="align-middle">{log.old_value}</td>
            <td className="align-middle">{timestamp.toLocaleString()}</td>
        </tr>
    )
}

export default LogTableRow;