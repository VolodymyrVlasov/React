import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function ({title, content, children}) {
    return (
        <div>
            <Modal toggle={() => {
            }}>
                <ModalHeader toggle={() => {
                }}>{title}</ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        console.log("Do Something")
                    }}>
                        Do Something
                    </Button>{' '}
                    <Button onClick={() => {
                        console.log("Cancel")
                    }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}