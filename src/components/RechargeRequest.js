import { Box, Button, Center, Divider, Flex, FormControl, Heading, Image, Input, KeyboardAvoidingView, NativeBaseProvider, Text, VStack } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import ajax from '../helper/ajax'
import RechargeRequestForm from './forms/RechargeRequestForm'
import Loading from './Loading'

export default class RechargeRequest extends Component {

    static propTypes = {
        accessToken: PropTypes.string.isRequired,
    }

    state = {}

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            type: props.route.params.rechargeType ? props.route.params.rechargeType : 'jazz',
            phoneNumber: '',
            amount: '',
        }

        console.log(props);
    }

    componentDidMount() {
        console.log(this.state);
    }

    setRechargeType = (type) => {
        this.setState({
            type : type
        });
    }

    async submitRequest(referenceNumber, amount) {

        console.log(this.state);

        Keyboard.dismiss();
        
        this.setState({
            loading : true
        })
        
        const response = await ajax.createRechargeRequest(
            this.props.accessToken, 
            this.state.type, 
            referenceNumber, 
            amount
        );

        console.log(response);
        this.setState({
            loading : false
        })

        this.props.navigation.navigate('Home', {
            user_request_id: response.user_request.id,
            amount: response.user_request.amount,
        });
    }

  render() {
      const { user } = this.props;
      console.log('create request render');
    return (
    <NativeBaseProvider>

        {
            this.state.loading && <Loading />
        }

        <Box flex={1} bg="blue.100" style={{ zIndex: 100}} safeArea>
            <Box h='70' bg='white'>
                <Flex direction='row' px={10} h='100%' alignItems='center'>
                    <Text flex={1}>Your Balance:</Text>
                    <Heading color='green.600' flex={1} textAlign='right'>{ this.props.route.params.balance }</Heading>
                </Flex>
            </Box>
            {
                (this.state.type == 'jazz_cash' || this.state.type == 'easy_paisa') ? 
                    <Divider /> :

                    <Box h={100}>
                <Flex direction='row'>
                    <Box flex={1} >
                        <Button variant="ghost" m={2} borderColor='gray.500'
                            onPress={ this.setRechargeType.bind(this, 'jazz') } 
                            borderWidth={ (this.state.type == 'jazz') ? 2 : 0 } 
                            isDisabled={ !this.props.route.params.jazz } >

                            <Center h='100%' >
                                <Image source={require('../../assets/jazz.png')} alt="Mobile Recharge" size='12' resizeMode={"contain"}></Image>
                            </Center>
                        </Button>
                    </Box>
                    <Box flex={1}>
                        <Button variant="ghost" m={2} borderColor='gray.500'
                            onPress={ this.setRechargeType.bind(this, 'zong')}
                            borderWidth={ (this.state.type == 'zong') ? 2 : 0 }
                            isDisabled={ !this.props.route.params.zong } >

                            <Center h='100%'>
                                <Image source={require('../../assets/zong.png')} alt="Jazzcash" size={12} resizeMode={"contain"}></Image>
                            </Center>
                        </Button>
                    </Box>
                    <Box flex={1}>
                        <Button variant="ghost" m={2} borderColor='gray.500' 
                            onPress={ this.setRechargeType.bind(this, 'telenor')} 
                            borderWidth={ (this.state.type == 'telenor') ? 2 : 0 } 
                            isDisabled={ !this.props.route.params.telenor } >

                            <Center h='100%'>
                                <Image source={require('../../assets/telenor.png')} alt="Easypaisa" size={12} resizeMode={"contain"}></Image>
                            </Center>
                        </Button>
                    </Box>
                    <Box flex={1}>
                        <Button variant="ghost" m={2} borderColor='gray.500' 
                            onPress={ this.setRechargeType.bind(this, 'ufone')} 
                            borderWidth={ (this.state.type == 'ufone') ? 2 : 0 } 
                            isDisabled={ !this.props.route.params.ufone } >

                            <Center h='100%'>
                                <Image source={require('../../assets/ufone.png')} alt="Easypaisa" size={12} resizeMode={"contain"}></Image>
                            </Center>
                        </Button>
                    </Box>
                </Flex>
            </Box>

            }

            <Box flex={1} bg='white' >    
                <RechargeRequestForm rechargeType={this.state.type} onSubmit={this.submitRequest.bind(this)}/>
            </Box>

        </Box>
    </NativeBaseProvider>
    )
  }
}