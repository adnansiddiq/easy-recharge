import { Camera, CameraType } from 'expo-camera';
import { Box, Button, Modal, Text } from 'native-base';
import React, { Component } from 'react'

export default class SentModel extends Component {
    state = {
        showModel : false,
        comment: null,
        hasPermission: null,
        cameraType: CameraType.back,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.takePermission()
    }

    async takePermission() {

        const { status } = await Permissions.askAsync(Permissions.Camera);
        this.setState({ hasPermission: status === 'granted' });

        // const { state } = await Camera.requestCameraPermissionsAsync();
        console.log(state)
        await this.setState({
            hasPermission: (status === 'granted'),
        })
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

        const { hasPermission } = this.state

        if (hasPermission === null) { 
            return (
                <Box />
            )
        } else if (hasPermission === false) {
            return (
                <Text>No access to camera</Text>
            )
          } else {
            return (
                <Modal isOpen={ this.state.showModel } onClose={() => closeModel() } >
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        
                        <Modal.Header >Request Processed</Modal.Header>
                        
                        <Modal.Body>
                            <Camera type={this.state.cameraType}>
                                <Box>
                                    <Button variant={'solid'} onPress={() => {
                                        this.setState({
                                            cameraType: (this.state.cameraType === CameraType.back ? CameraType.front : CameraType.back)
                                        });
                                    }}>
                                        Flip
                                    </Button>
                                </Box>
                            </Camera>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button flex={1} variant="ghost" colorScheme="blueGray" onPress={() => {
                                closeModel(false, this.state.comment)
                            }}>Cancel</Button>

                            <Button flex={1} variant='solid' colorScheme={'green'} onPress={() => {
                                closeModel(true, this.state.comment)
                            }}> Done </Button>

                        </Modal.Footer>

                    </Modal.Content>
                </Modal>
            )
          }
  }
}