import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import Modal from 'react-bootstrap/Modal';

interface Props {
    show: boolean;
}

const LoadingModal: FC<Props> = ({ show }) => {
    const loadingIcon = <FontAwesomeIcon className="spinner mx-1" icon={faSpinner} />;
    return (
        <>
            <Modal show={show} backdrop="static" keyboard={false} centered>
                <Modal.Body>
                    {loadingIcon}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoadingModal;