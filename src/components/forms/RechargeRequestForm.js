import { Button, FormControl, Input, KeyboardAvoidingView, VStack } from 'native-base'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

export default class RechargeRequestForm extends Component {

  static propTypes = {
    rechargeType: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    phoneNumber: '',
    amount: '',
  }

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <VStack space={3} mx="8" my={5}>
              <FormControl isRequired>
                  <FormControl.Label>Enter {this.props.rechargeType.toUpperCase() } Number</FormControl.Label>
                  <Input placeholder='eg. 03123456789' 
                      onChangeText={(num) => this.setState({phoneNumber: num}) } 
                      defaultValue={this.state.phoneNumber}
                      textAlign="center" 
                      keyboardType='numeric'
                      fontSize='md'
                      fontWeight='bold' />
              </FormControl>
                      
              <FormControl isRequired mt="2">
                  <FormControl.Label>Amount</FormControl.Label>
                  <Input placeholder='eg. 100' 
                      onChangeText={(amount) => this.setState({ amount : amount}) } 
                      defaultValue={ this.state.pin }
                      textAlign="center" 
                      keyboardType='numeric'
                      fontSize='md'
                      fontWeight='bold' />    
              </FormControl>

              <Button mt="5" colorScheme="indigo" onPress={ () => { this.props.onSubmit(this.state.phoneNumber, this.state.amount) } } >Recharge</Button>
          </VStack>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }
}