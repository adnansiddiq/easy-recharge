import React, { Component } from 'react'
import { 
    Box, 
    Button, 
    Center, 
    Divider, 
    Flex, 
    Heading, 
    Image, 
    NativeBaseProvider, 
    Text, 
    Toast
} from 'native-base'
import ajax from '../helper/ajax';
import moment from 'moment'
import Loading from './Loading';
import Timer from './chunks/Timer';

export default class RechargeRequestDetail extends Component {

    state = {
        dataLoaded: false,
        userRequest: null,
        cancelTime: 0,
        timeout: null,
    };

    images = {
        jazz : require('../../assets/jazz.png'),
        ufone: require('../../assets/ufone.png'),
        telenor: require('../../assets/telenor.png'),
        zong: require('../../assets/zong.png'),
        jazz_cash: require('../../assets/jazzcash.png'),
        easy_paisa: require('../../assets/easypaisa.png')
    }

    title = {
        jazz: 'Jazz / Warid',
        ufone: 'Ufone',
        telenor: 'Telenor',
        zong: 'Zong',
        jazz_cash: 'Jazz Cash Account',
        easy_paisa: 'Easy Paisa Account'
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getRequestDetails()
    }

    componentWillUnmount() {
        console.log("Detail UnMount");
        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
    }

    async getRequestDetails() {

        this.setState({
            cancelTime: 0,
            dataLoaded: false,
            timeout: null,
        });

        const response = await ajax.getRequestDetails(this.props.accessToken, this.props.route.params.request_id);

        console.log(response);

        const cancelTime = this.getCancelTime(response.user_request);

        var timeout = null;
        if (cancelTime > 0) {
            timeout = setTimeout(() => {
                this.setState({
                    cancelTime: 0
                });
            }, cancelTime*1000);
        }

        this.setState({
            dataLoaded: true,
            userRequest : response.user_request,
            cancelTime: cancelTime,
            timeout: timeout,
        });
    }

    getStatusLayout() {
        
        const request = this.state.userRequest;
        
        if (request.rejected_at != null) {
            return (
                
                    <Heading size='2xl' color={'red.500'}>REJECTED</Heading>
            );
        }

        if (request.sent_at != null) {
            return (
                    <Heading size='2xl' color={'green.500'}>SUCCESS</Heading>
            );
        }

        if (request.canceled_at != null) {
            return (
                    <Heading size='2xl' color={'gray.500'}>CANCELED</Heading>
            );
        }

        return (
                <Heading size='2xl' color={'blue.400'}>PENDING</Heading>
            );

    }

    getCancelTime(request) {

        if (!request) {
            return 0;
        }

        if (request.canceled_at) {
            return 0
        }

        const createdAt = moment.utc(request.created_at).local();
        const now = moment();
        
        const seconds = now.diff(createdAt, 'seconds');
        
        if (seconds < 120) {
            return 120 - seconds;
        }
        return 0;
    }

    async cancelRequest() {

        this.setState({
            dataLoaded: false
        });

        const response = await ajax.cancelRechargeRequest(this.props.accessToken, this.props.route.params.request_id);
        
        if (response.error) {
            Toast.show({ title: response.error})
        } else if (response.message) {
            Toast.show({ title: response.message})
        }

        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }

        this.getRequestDetails()
    }

  render() {

    console.log("Detail Render");

    const request = this.state.userRequest;

    return (
    <NativeBaseProvider>

        { !this.state.dataLoaded && <Loading /> }

        <Box flex={1} bg='blue.100' safeArea>

            <Box h='90' p={5}>
                <Center w='100%'>
                    {
                        request ? (
                            this.getStatusLayout()
                        ) : (
                            <Heading size='2xl'>WAITING</Heading>
                        )
                    }
                </Center>
            </Box>

            <Box flex={1} bg='white' mx={2} p={4} rounded='md' shadow='1' borderWidth={1} borderColor='gray.200'>

                { request &&
                <Box flex={1}>
                    <Flex direction='row'>
                        <Image source={ this.images[request.type] } alt="Mobile Recharge" size='lg' resizeMode={"contain"}></Image>
                        <Box flex={1}></Box>
                        <Heading p={5} fontSize={'4xl'} alignSelf={'center'} color={'green.600'} minW='100' textAlign='center' bg={'blue.100'} rounded='lg' shadow={1}>{ request.amount }</Heading>
                    </Flex>

                    <Text textAlign='left' mt={5}>{this.title[request.type]} Number:</Text>
                    <Heading w='100%' color='gray.600' textAlign='right'>{ request.reference_number }</Heading>

                    <Text textAlign='left' mt={3}>ID:</Text>
                    <Heading fontSize={'md'} w='100%' color='gray.600' textAlign='right' mb={2}>{ request.id }</Heading>

                    <Divider />
                    <Flex direction='row' mt={1}>
                        <Text flex={1} textAlign='center' fontSize='xs' color={'gray.400'}>Created Time:</Text>
                        <Text flex={1} textAlign='center' fontSize='xs'>
                            { moment.utc(request.created_at).local().format('DD MMM YYYY, HH:mm z') }
                        </Text>
                    </Flex>

                    { request.rejected_at &&
                     <Flex direction='row'>
                            <Text flex={1} textAlign='center' fontSize='xs' color={'gray.400'}>Rejected Time:</Text>
                            <Text flex={1} textAlign='center' fontSize='xs'>
                                { moment.utc(request.rejected_at).local().format('DD MMM YYYY, HH:mm z') }
                            </Text>
                        </Flex>
                    }

                    { request.canceled_at &&
                     <Flex direction='row'>
                            <Text flex={1} textAlign='center' fontSize='xs' color={'gray.400'}>Canceled Time:</Text>
                            <Text flex={1} textAlign='center' fontSize='xs'>
                                { moment.utc(request.canceled_at).local().format('DD MMM YYYY, HH:mm z') }
                            </Text>
                        </Flex>
                    }

                    { request.sent_at &&
                     <Flex direction='row'>
                            <Text flex={1} textAlign='center' fontSize='xs' color={'gray.400'}>Sent Time:</Text>
                            <Text flex={1} textAlign='center' fontSize='xs'>
                                { moment.utc(request.sent_at).local().format('DD MMM YYYY, HH:mm z') }
                            </Text>
                        </Flex>
                    }

                </Box>
                }

                { (request && this.state.cancelTime > 0) &&
                    <Box h={120} w='100%' mt={2}>
                        <Center>
                            <Timer timer={ this.state.cancelTime } />
                        </Center>
                        <Button colorScheme="rose" onPress={ this.cancelRequest.bind(this) } w='100%' mt={2}>Cancel</Button>
                    </Box>
                }

            </Box>

            <Box w='100%' h={50} my={2} px={2}>
                <Button size={'md'} colorScheme="indigo" onPress={ () => { this.props.navigation.goBack() } } w='100%'>Back</Button>
            </Box>

        </Box>
    </NativeBaseProvider>  
    )
  }
}