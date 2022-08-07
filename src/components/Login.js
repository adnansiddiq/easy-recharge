import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NativeBaseProvider, Box, Heading, Center, VStack, FormControl, Input, Button, KeyboardAvoidingView, Toast } from 'native-base'
import ajax from '../helper/ajax';
import Loading from './Loading';

export default class Login extends Component {
    static propTypes = {
        onLoginSuccess: PropTypes.func.isRequired,
    };
    
    state = {
        phoneNumber: "03217064276",
        pin: "123456789",
    };

    constructor(props) {
        super(props);

        this.loadingRef = React.createRef()
    }

    showLoding(show) {
        this.loadingRef.current.setState({
            show: show
        });
    }

    async login () {

        this.showLoding(true)

        Keyboard.dismiss();

        const response = await ajax.login(this.state.phoneNumber, this.state.pin);

        this.showLoding(false)

        this.props.onLoginSuccess(response);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

  render() {
      console.log("Login Render")
    return (
        <NativeBaseProvider>

            <Loading ref={this.loadingRef} />
            
            <Box position='absolute' bg='white' top={0} bottom={0} left={0} right={0} style={{ zIndex: 100}} safeArea>

                <Center flex={1} w="100%" pb={100}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Box p="2" py="8" w="100%" maxW="300" position='absolute' styles={ { zIndex : 5 }}>
            
                            <Center>
                                <Heading py={10} size="2xl" color="blue.400">INVIGOSOL</Heading>
                            </Center>

                            <Heading size="lg" fontWeight="600" color="coolGray.800">
                                Welcome
                            </Heading>
                            <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
                                Sign in to continue!
                            </Heading>

                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                                <VStack space={3} mt="10">
                                    <FormControl isRequired>
                                        <FormControl.Label>Phone Number</FormControl.Label>
                                        <Input placeholder='eg. 03123456789' 
                                            onChangeText={(num) => this.setState({phoneNumber: num}) } 
                                            defaultValue={this.state.phoneNumber}
                                            textAlign="center" 
                                            keyboardType='numeric' />
                                    </FormControl>
                                    
                                    <FormControl isRequired mt="2">
                                        <FormControl.Label>Password</FormControl.Label>
                                        <Input placeholder='eg. 1234' 
                                            onChangeText={(pass) => this.setState({ pin : pass}) } 
                                            defaultValue={ this.state.pin }
                                            type="password" 
                                            textAlign="center" 
                                            keyboardType='numeric' />    
                                    </FormControl>

                                    <Button mt="10" colorScheme="indigo" onPress={ this.login.bind(this) }>Login</Button>
                                </VStack>
                            </KeyboardAvoidingView>
                        </Box>
                    </TouchableWithoutFeedback>
                </Center>

            </Box>

        </NativeBaseProvider>
    )
  }
}

const styles = StyleSheet.create({
    header: {
        fontSize: "lg",
        fontWeight: "bold",
        letterSpacing: "lg",
    },

    inputLable: {
        bold: true
    }
})