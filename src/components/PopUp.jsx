import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'

function Popup({ children, modalTitle, addtionMessage, colorofModal, addtionalButtonColor, additionalTask }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button colorScheme={colorofModal} onClick={onOpen}>{modalTitle}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {children}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                      {addtionMessage &&  <Button onClick={additionalTask} colorScheme = {addtionalButtonColor}>{addtionMessage}</Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Popup;