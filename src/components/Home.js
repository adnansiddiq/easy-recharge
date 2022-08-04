import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
    Center, 
    NativeBaseProvider, 
    Box, 
    Flex, 
    Heading, 
    Divider, 
    Image,
    Text,
    Button, 
} from 'native-base'
import { AntDesign, Entypo, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import ajax from '../helper/ajax';

export default class Home extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    state = {
        user: null,
        balance: 0,
    };

    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            balance: this.getBalance(props.user),
        };
    }

    componentDidMount() {
        console.log("Home componentDidMount");
        this.getMe();
    }

    componentDidUpdate(prevProps) {
        console.log("Home componentDidUpdate");

        if (JSON.stringify(prevProps.route.params) != JSON.stringify(this.props.route.params)) {

            if (this.props.route.params != undefined && this.props.route.params.user_request_id != undefined) {
                setTimeout(() => {
                    this.props.navigation.navigate('RechargeRequestDetail', {
                        request_id: this.props.route.params.user_request_id
                    });
    
                }, 100);
            }
        }

        this.getMe();
    }

    async getMe() {

        const response = await ajax.getMe(this.props.accessToken);
        const balance = this.getBalance(response.user);

        if (balance != this.state.balance || 
            response.user.cash_back != this.state.user.cash_back) {

            this.setState({
                user : response.user,
                balance: this.getBalance(response.user),
            });
        }
    }

    getBalance(user) {
        return user.available_balance - user.reserved_balance;
    }


  render() {

      const user = this.state.user;

      console.log('Home Screen Render');
      
    return (
    <NativeBaseProvider>
        { user &&
        <Box flex={1} bg="blue.100" safeArea>
            
            <Box flex={2} justifyContent='center'>

                <Flex h={100} direction='row'>
                    {/* <Box w={100} h={100} bg='white' mx="5" rounded='50' overflow="hidden"></Box> */}
                    <Box flex={1} mx="5" alignItems='center'>
                        <Heading mt={3} size="lg" color="blue.400">{ user.name }</Heading>
                        <Text mt={2} color="gray.500" >{ user.mobile_no }</Text>
                    </Box>
                </Flex>
                
            </Box>

            <Box flex={3} bg='white' m={5} rounded='lg' shadow={1} >
                <Flex direction='row'>
                    <Box flex={1} h='100%'>
                        <Button variant={'ghost'} onPress={ () => { this.props.navigation.navigate('Transaction') } }>
                            <Center h='100%' w='100%'>
                                <Box flex={1}></Box>
                                <Text>Available Balance</Text>
                                <Box flex={1}></Box>
                                <Heading size='2xl' color='green.600'>{ this.state.balance }</Heading>
                                <Box flex={1}></Box>
                                <Text fontSize={'xs'} color='blue.400' underline>See All Transactions</Text>
                                <Box flex={1}></Box>
                            </Center>
                        </Button>
                    </Box>
                    <Divider orientation="vertical" />
                    <Box flex={1} h='100%'>
                        <Button variant={'ghost'}>
                            <Center h='100%' w='100%'>
                                <Box flex={1}></Box>
                                <Text>Earning</Text>
                                <Box flex={1}></Box>
                                <Heading size='2xl' color='green.600'>{ user.cash_back }</Heading>
                                <Box flex={1}></Box>
                                <Text fontSize={'xs'} color='blue.400' underline>Add To Balance</Text>
                                <Box flex={1}></Box>
                            </Center>
                        </Button>
                    </Box>
                </Flex>
            </Box>

            <Box flex={3} bg='white' m={5} rounded='lg' shadow={1} p='4'>
                <Heading size='xs'>Recharge & Money Transfer</Heading>
                <Flex direction='row' my={8}>
                    <Box flex={1}>
                        <Button variant="ghost" isDisabled={ this.state.balance > 50 ? false : true } onPress={ () =>  {
                            this.props.navigation.navigate('RechargeRequest', {
                                'balance' : this.state.balance,
                                'jazz': this.state.user.jazz,
                                'ufone': this.state.user.ufone,
                                'telenor': this.state.user.telenor,
                                'zong': this.state.user.zong
                            });

                        }}>
                            <Center h='100%'>
                                <Image source={require('../../assets/power-bank.png')} alt="Mobile Recharge" size={50} resizeMode={"contain"}></Image>
                                <Text underline mt={3} style={{ textAlign: 'center' }}>Mobile Recharge</Text>
                            </Center>
                        </Button>
                    </Box>
                    <Box flex={1}>
                        <Button variant="ghost" 
                            isDisabled={ !this.state.user.jazz_cash } 
                            onPress={ () => {
                                this.props.navigation.navigate('RechargeRequest', {
                                    'balance' : this.state.balance,
                                    'rechargeType': 'jazz_cash'
                                });
                            }}>

                            <Center h='100%'>
                                <Image source={require('../../assets/jazzcash.png')} alt="Jazzcash" size={60} resizeMode={"contain"}></Image>
                                <Text underline mt={3} style={{ textAlign: 'center' }}>JazzCash</Text>
                            </Center>
                        </Button>
                    </Box>
                    <Box flex={1}>
                        <Button variant="ghost" 
                            isDisabled={ !this.state.user.easy_paisa }
                            onPress={ () => {
                                this.props.navigation.navigate('RechargeRequest', {
                                    'balance' : this.state.balance,
                                    'rechargeType': 'easy_paisa'
                                });
                            }}>

                            <Center h='100%'>
                                <Image source={require('../../assets/easypaisa.png')} alt="Easypaisa" size={60} resizeMode={"contain"}></Image>
                                <Text underline mt={3} style={{ textAlign: 'center' }}>Easypaisa</Text>
                            </Center>
                        </Button>
                    </Box>
                </Flex>
            </Box>

            <Box h={60} bg='white' roundedTop='md' overflow="hidden" borderColor='gray.200' borderWidth="1" shadow={1}>
                <Flex direction='row' px={2}>
                    <Box flex={1} ml={4} alignItems='center'>
                        <Button variant="ghost" onPress={() => { console.log("Home Press") }}>
                            <Center>
                                <Entypo name="home" size={24} color="black"/>
                                <Heading size={'xs'} textAlign='center' w='100%'>Home</Heading>
                            </Center>
                        </Button>
                    </Box>
                    <Box flex={1} mx={4}>
                        <Button variant="ghost" onPress={() => { this.props.navigation.navigate('RechargeRequestList') }}>
                            <Center>
                                <MaterialIcons name="payments" size={24} color="black" />
                                <Heading size={'xs'} textAlign='center' w='100%'>History</Heading>
                            </Center>
                        </Button>
                    </Box>
                    <Box flex={1} mr={4} alignItems='center'>
                        <Button variant="ghost" onPress={() => { console.log("Logout Press"); this.props.logout() }}>
                            <Center>
                                <AntDesign name="logout" size={24} color="black" />
                                <Heading size={'xs'} textAlign='center' w='100%'>Logout</Heading>
                            </Center>
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </Box>
  }
    </NativeBaseProvider>
    )
  }
}
