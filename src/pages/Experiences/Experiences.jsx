import React, { useState } from 'react'
import ExperienceForm from './ExperiencesComponents/ExperienceInput'
import AllExperiencesTable from './ExperiencesComponents/AllExperiencesTable'
import { Button, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { globalData } from '../../data/global'

const Experiences = () => {
  const [addExperiencesFlag, setAddExperiencesFlag] = useState(false);

  const onClose = () => {
    setAddExperiencesFlag(false);
  };

  return (
    <div>
      <Center>
        <Button onClick={() => setAddExperiencesFlag(prev => !prev)} colorScheme={addExperiencesFlag ? globalData.buttonColorCancel : globalData.buttonColorNormal}>
          {addExperiencesFlag ? "Later" : "Add New Experience"}
        </Button>
      </Center>

      <Modal isOpen={addExperiencesFlag} onClose={onClose} size="xxl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Experience</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ExperienceForm />
          </ModalBody>
          <ModalFooter>
            {/* Add any additional footer buttons if needed */}
            <Button colorScheme={globalData.buttonColorCancel} mr={3} onClick={onClose}>
              Close
            </Button>
            {/* Add a submit button if needed */}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AllExperiencesTable />
    </div>
  );
}

export default Experiences;
