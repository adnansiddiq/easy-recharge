import { AlertDialog, Button } from 'native-base'
import React, {Component} from 'react'

export const AlertType = {
    default: 0,
    success: 1,
    delete: 2,
    ok: 3,
}

export default class AlertBox extends Component {

    static alertRef = null

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            type: AlertType.default,
            isOpen : false
        }

        this.cancelRef = React.createRef()

        this.attribues = [
            {
                actionButton: {
                    color: "info",
                    title: "Done",
                },
            },
            {
                actionButton: {
                    color: "green",
                    title: "Submit"
                }
            },
            {
                actionButton: {
                    color: "danger",
                    title: "Delete"
                }
            }
        ]
    }

    componentDidMount() {
        AlertBox.alertRef = this
    }

    hide() {
        this.setState({
            isOpen: false
        })
    }

    submitAction() {
        this.hide()
        this.props.onSubmit && this.props.onSubmit()
    }

    cancelAction() {
        this.hide()
        this.props.onCancel && this.props.onCancel()
    }

    static show(data) {
        this.alertRef.setState({
            ...data,
            isOpen: true
        })
    }

    render() {
        return <AlertDialog 
        leastDestructiveRef={this.cancelRef} 
        isOpen={this.state.isOpen} 
        onClose={this.cancelAction.bind(this)}>
        <AlertDialog.Content>  
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{this.state.title}</AlertDialog.Header>
          <AlertDialog.Body>{this.state.description}</AlertDialog.Body>
          <AlertDialog.Footer>
              <Button w={'20'} variant="subtle" colorScheme="coolGray" ref={this.cancelRef} onPress={this.cancelAction.bind(this)}>
                { this.state.type !== AlertType.ok ? "Cancel" : "Ok" }
              </Button>
              { this.state.type !== AlertType.ok && <Button ml={1} w={'20'} colorScheme={
                  this.attribues[this.state.type].actionButton.color
                } onPress={this.submitAction.bind(this)}>

                {this.attribues[this.state.type].actionButton.title}
              </Button>}
            
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    }
}
