import { Camera, CameraType } from 'expo-camera';
import { Box, Button, Center, Flex, Image } from 'native-base';
import React, { Component } from 'react'
import * as ImageManipulator from 'expo-image-manipulator';
import { Modal } from 'react-native';

export default class CameraModel extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            camera: null,
            show: false,
            imageUrl: null,
        }

        this.camera = React.createRef()
    }

    async takePicture() {

        if (this.camera.current) {
            const data = await this.camera.current.takePictureAsync();
            
            const result = await ImageManipulator.manipulateAsync(
                data.uri, 
                [{ resize: {width: 500, height: 500} }],
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG}
            );

            this.setState({
                imageUrl: result.uri,
            });
        }
    }

    close() {
        this.setState({
            show: false
        })
    }

    submit() {
        this.close()
        this.props.onSubmit(this.state.imageUrl)
    }

    render() {
        console.log("Camera Render");
        
        return (
        
            <Modal 
                animationType='slide'
                transparent={false}
                visible={this.state.show}
                onRequestClose={() => { }}>
                <Box flex={1} >

                    <Camera 
                        w={'100%'} 
                        type={CameraType.back}
                        ratio={'1:1'}
                        style={{
                            aspectRatio: 1
                        }}
                        ref={this.camera} >
                        
                    </Camera>

                    { (this.state.imageUrl !== null) &&
                        <Center flex={1}  w={'100%'} bg={'white'}>
                            <Image w={'60%'} aspectRatio={1} source={{ uri: this.state.imageUrl} } rounded={'lg'} alt="Mobile Recharge" resizeMode={"contain"} />
                        </Center>
                    }

                    { (this.state.imageUrl === null) ? 

                        <Flex direction='row' h={60} w={'100%'} p={2} bottom={1} position={'absolute'}>
                            <Button flex={1} mr={1} variant="solid" colorScheme="red" onPress={() => {
                                this.close()
                            }}>Cancel</Button>

                            <Button flex={1} ml={1} variant='solid' colorScheme={'green'} onPress={() => {
                                this.takePicture()
                            }}> Take </Button>
                        </Flex> : 
                        
                        <Flex direction='row' h={60} w={'100%'} p={2} bottom={1} position={'absolute'}>
                            <Button flex={1} mr={1} variant="solid" colorScheme="red" onPress={() => {
                                this.takePicture()
                            }}>Retake</Button>

                            <Button flex={1} ml={1} variant='solid' colorScheme={'green'} onPress={() => {
                                this.submit()
                            }}> Submit </Button>
                        </Flex>
                    }
                </Box>

            </Modal>
        )
  }
}