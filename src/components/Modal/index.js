import React from 'react'
import { 
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'

function Modal(props) {
      
  return (
        <Modal isOpen={props.isOpen} toggle={props.closeModal} className={props.className} backdrop='static'>
          <ModalHeader toggle={props.closeModal}>Titulo Modal</ModalHeader>
          <ModalBody>
            {'BLABLABLABODY'}
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={props.closeModal}>OK</Button>{'MAS BLABLA FOOTER'}
          </ModalFooter >
        </Modal>
    )
  
}

export default Modal