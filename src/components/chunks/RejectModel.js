import { Button, FormControl, Input, Modal } from 'native-base';
import React, { Component } from 'react'

export default class RejectModel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            comment: 'Insufficent Balance: ' + props.balance,
        }
    }

    closeModal(reject) {
        this.setState({
            showModal: false
        })

        if (reject === true) {
            this.props.closeModal(this.state.comment)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.showModal != this.state.showModal;
    }

  render() {

    const { balance, closeModal } = this.props

    return (
        <Modal isOpen={ this.state.showModal } onClose={() => this.closeModal() } >
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header >Reject Request</Modal.Header>
                <Modal.Body>
                <FormControl>
                    <FormControl.Label>Reject Reason</FormControl.Label>
                    <Input  defaultValue={ 'Insufficent Balance: ' + balance  } 
                        onChangeText={(comment) => this.setState({comment: comment}) } />
                </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button flex={1} variant="ghost" colorScheme="blueGray" onPress={() => {
                    
                        this.closeModal(false)
                    }}>Cancel</Button>

                    <Button flex={1} variant='solid' colorScheme={'red'} onPress={() => {
                        this.closeModal(true)
                    }}> Reject </Button>

                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
  }
}