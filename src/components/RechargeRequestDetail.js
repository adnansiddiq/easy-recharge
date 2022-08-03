import React, { Component } from 'react'
import { 
    Box, 
    Button, 
    Center, 
    Divider, 
    Flex, 
    FormControl, 
    Heading, 
    Image, 
    Input, 
    Modal, 
    NativeBaseProvider, 
    Text, 
    Toast,
    useColorModeValue
} from 'native-base'
import ajax from '../helper/ajax';
import moment from 'moment'
import Loading from './Loading';
import Timer from './chunks/Timer';
import ShowNumber from './chunks/ShowNumber';
import VerifyInfo from './chunks/VerifyInfo';
import ShowDateTime from './chunks/ShowDateTime';
import RejectModel from './chunks/RejectModel';
import SentModel from './chunks/SentModel';

export default class RechargeRequestDetail extends Component {

    state = {
        dataLoaded: false,
        userRequest: null,
        cancelTime: 0,
        timeout: null,
        showRejectModel: false,
        showSentModel: false,
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

        const response = await ajax.getRequestDetails(this.props.admin, this.props.accessToken, this.props.route.params.request_id);

        console.log(response)

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

    isPending() {
        const request = this.state.userRequest;
        return (request.rejected_at == null && request.sent_at == null && request.canceled_at == null);
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
                    <Heading size='2xl' color={'green.500'}>TRANSFERED</Heading>
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

    async rejectRequest(comment) {

        console.log("Reject Request")

        this.setState({
            dataLoaded: false
        });

        const response = await ajax.rejectRechargeRequest(this.props.accessToken, this.props.route.params.request_id, comment);
        
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

    closeRejectModel(reject, comment) {

        this.setState({
            showRejectModel: false,
        })

        if (reject) {
            this.rejectRequest(comment)
        }
    }

    closeSentModel() {
        console.log('sent action')

        this.setState({
            showSentModel: false,
        })
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

            <Box flex={1} bg='white' mx={2} px={4} pb={4} rounded='md' shadow='1' borderWidth={1} borderColor='gray.200'>

                { request &&
                <Box flex={1}>
                    <Text textAlign='center' mt={3}>RE-{moment.utc(request.created_at).local().format('DDMM')}-{ request.id }</Text>
                    <Flex direction='row'>
                        <Image source={ this.images[request.type] } alt="Mobile Recharge" size='lg' resizeMode={"contain"}></Image>
                        <Box flex={1}></Box>
                        <Heading p={5} fontSize={'4xl'} alignSelf={'center'} color={'green.600'} minW='100' textAlign='center' bg={'blue.100'} rounded='lg' shadow={1}>
                            { request.amount }
                        </Heading>
                    </Flex>

                    <Text textAlign='left' mt={5}>{this.title[request.type]} Number:</Text>
                    <Center my={2}>
                        <Heading textAlign='center' borderWidth={1} px={2} rounded={'md'}>{ request.reference_number }</Heading>
                    </Center>

                    <Divider />
                    <ShowDateTime mt={1} label='Created Time' date={request.created_at} />

                    { request.rejected_at &&
                        <ShowDateTime label='Rejected Time' date={request.rejected_at} />
                    }

                    { request.canceled_at &&
                        <ShowDateTime label='Canceled Time' date={request.canceled_at} />
                    }

                    { request.sent_at &&
                        <ShowDateTime label='Sent Time' date={request.sent_at} />
                    }

                    { (this.props.admin && request.user && this.isPending()) && 
                        <VerifyInfo userName={ request.user.name } 
                            phoneNumber={ request.user.mobile_no } 
                            balance={ request.user.available_balance } />
                    } 
                    
                    { (!this.isPending() &&  request.comments != null) &&
                        <Box flex={1} mt={3} p={2} bg='amber.100' rounded={'lg'} borderWidth={1} borderColor={'gray.400'}>
                            <Center h='100%'>
                                <Text>{ request.comments }</Text>
                            </Center>
                        </Box>
                    }

                </Box>
                }

                { (request && this.state.cancelTime > 0 && !this.props.admin) &&
                    <Box h={120} w='100%' mt={2}>
                        <Center>
                            <Timer timer={ this.state.cancelTime } />
                        </Center>
                        <Button colorScheme="rose" onPress={ this.cancelRequest.bind(this) } w='100%' mt={2}>Cancel</Button>
                    </Box> 
                }

                { (request && this.isPending() && this.props.admin) &&
                    <Box h={50} w='100%' mt={2}>
                        <Flex direction='row'>
                            <Button flex={1} mr={1} colorScheme="rose" onPress={ () => { this.setState({ showRejectModel: true }) } } >Reject</Button>
                            <Button flex={1} ml={1} colorScheme="green" onPress={ () => { this.setState({ showSentModel: true }) } } >Sent</Button>
                        </Flex>
                    </Box>
                }

            </Box>

            <Box w='100%' h={50} my={2} px={2}>
                <Button size={'md'} colorScheme="indigo" onPress={ () => { this.props.navigation.goBack() } } w='100%'>Back</Button>
            </Box>

        </Box>

        { request && 
            <RejectModel isOpen={ this.state.showRejectModel } balance={request.user.available_balance} closeModel={ this.closeRejectModel.bind(this) } />
        }

        {request && <SentModel isOpen={ this.state.showSentModel } balance={request.user.available_balance} closeModel={ this.closeSentModel.bind(this) } />}

    </NativeBaseProvider>  
    )
  }
}