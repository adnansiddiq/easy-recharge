import { Button, FormControl, Input, Modal } from 'native-base';
import React, { Component } from 'react'

export default class RejectModel extends Component {

    state = {
        showModel : false,
        comment: null,
    }

    constructor(props) {
        super(props)
        this.state = {
            showModel: props.isOpen,
            comment: 'Insufficent Balance: ' + props.balance,
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props.isOpen != state.showModel) {
            return {
                showModel: props.isOpen
            };
        }

        return null

    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.showModel != this.state.showModel;
    }

  render() {

    const { balance, closeModel } = this.props

    return (
        <Modal isOpen={ this.state.showModel } onClose={() => closeModel() } >
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
                        closeModel(false, this.state.comment)
                    }}>Cancel</Button>

                    <Button flex={1} variant='solid' colorScheme={'red'} onPress={() => {
                        closeModel(true, this.state.comment)
                    }}> Reject </Button>

                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
  }
}