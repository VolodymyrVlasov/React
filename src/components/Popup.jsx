import {Button, Modal} from "react-bootstrap";
import {useState} from "react";

export default function Popup({
                                  callBtnText = "Show",
                                  applyBtnText = "Ok",
                                  cancelBtnText = "Cancel",
                                  callBtnStyle = "primary",
                                  modalHeading = "",
                                  isBtn = true,
                                  children
                              }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>{callBtnText}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children || <p>Close me</p>}</Modal.Body>

                {isBtn && <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>{cancelBtnText}</Button>
                    <Button variant="primary" onClick={handleClose}>{applyBtnText}</Button>
                </Modal.Footer>}

            </Modal>
        </>
    );
}