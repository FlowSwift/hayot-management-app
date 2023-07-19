import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import Modal from 'react-bootstrap/Modal';

interface Props {
    show: boolean;
}

const LoadingModal: FC<Props> = ({ show }) => {
    const loadingIcon = <FontAwesomeIcon size='2x' className="spinner mx-1" icon={faSpinner} />;
    return (
        <>
            <Modal className="loading-modal" show={show} backdrop={false} keyboard={false} centered>
                <Modal.Body>
                    {loadingIcon}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoadingModal;