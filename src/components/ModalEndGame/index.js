import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

class ModalEndGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true
    };

    this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  changeBackdrop(e) {
    let value = e.target.value;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }

  render() {
    return (
      <div>
        <Form inline onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <Label for='backdrop'>Backdrop value</Label>{' '}
            <Input type='select' name='backdrop' id='backdrop' onChange={this.changeBackdrop}>
              <option value='true'>true</option>
              <option value='false'>false</option>
              <option value='static'>'static'</option>
            </Input>
          </FormGroup>
          {' '}
          <Button color='danger' onClick={this.toggle}>{this.props.buttonLabel}</Button>
        </Form>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            {' '}
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggle}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalEndGame;