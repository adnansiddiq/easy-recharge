import React, { Component } from 'react'
import { 
    Box, 
    Button, 
    Center, 
    FlatList, 
    Flex, 
    Heading, 
    NativeBaseProvider
} from 'native-base'
import PropTypes from 'prop-types'
import ajax from '../helper/ajax';
import RechargeRequestItem from './chunks/RechargeRequestItem';
import Loading from './Loading';
import LoadMore from './chunks/LoadMore';
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default class RechargeRequestList extends Component {

    static propTypes = {
        accessToken: PropTypes.string.isRequired,
    }

    state = {
        dataLoaded: false,
        data : [],
        page: 1,
        haveMore: false,
        loading: false,
        status: 'pending',
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log("Recharge Requests Mount");
        this.loadData();
    }

    async loadData() {
        await this.setState({
            loading: true,
        })

        console.log("Before call: " + this.state.status)

        const response = await ajax.getRechargeRequests(
            this.props.admin,
            this.props.accessToken, 
            this.state.page, 
            this.state.status,
        );
        
        this.setState({
            data : [ ...this.state.data, ...response.user_requests],
            dataLoaded : true,
            page: this.state.page + 1,
            haveMore: response.user_requests.length == 25,
            loading: false,
        });
    }

    fileterAction(status) {
        console.log(status)
        
        this.setState({
            dataLoaded: false,
            data : [],
            page: 1,
            haveMore: false,
            loading: false,
            status: status,
        });

        this.loadData()

    }

    itemClicked(requestId) {
        console.log("Press: " + requestId);

        this.props.navigation.navigate('RechargeRequestDetail', {
            'request_id' : requestId
        });
    }

  render() {
    return (
        <NativeBaseProvider>
            
            { !this.state.dataLoaded && <Loading /> }

            <Box flex={1} bg='blue.100' safeArea>

                <FlatList
                    flex={1} 
                    data={ this.state.data } 
                    renderItem={ ( {
                        item
                    }) => <RechargeRequestItem request={item} onSelect={ this.itemClicked.bind(this) } /> } 
                    keyExtractor={item => item.id} 
                    ListFooterComponent={ ( this.state.haveMore &&
                        <LoadMore loading={ this.state.loading } loadMore={ this.loadData.bind(this) }/>
                    )} />

                <Box h={60} bg='white' roundedTop='md' overflow="hidden" borderColor='gray.200' borderWidth="1" shadow={1}>
                    <Flex direction='row'>
                        <Box flex={1} ml={4} alignItems='center'>
                            <Button w='100%' variant={ this.state.status == 'pending' ? "subtle" : "ghost" } 
                                onPress={() => { this.fileterAction('pending') }}>
                                
                                <Center>
                                    <MaterialIcons name="pending" size={24} color="black" />
                                    <Heading size={'xs'} textAlign='center' w='100%'>Pending</Heading>
                                </Center>
                            </Button>
                        </Box>
                        <Box flex={1} mx={4}>
                            <Button w='100%' variant={ this.state.status == 'completed' ? "subtle" : "ghost" } 
                                onPress={() => { this.fileterAction('completed') }}>
                                
                                <Center>
                                    <Ionicons name="checkmark-done-circle" size={24} color="black" />
                                    <Heading size={'xs'} textAlign='center' w='100%'>Completed</Heading>
                                </Center>
                            </Button>
                        </Box>
                        { this.props.admin ? 
                            <Box flex={1} mx={4}>
                                <Button w='100%' variant={ this.state.status == 'canceled' ? "subtle" : "ghost" } 
                                    onPress={() => { this.fileterAction('canceled') }}>
                                    
                                    <Center>
                                        <MaterialCommunityIcons name="cancel" size={24} color="black" />
                                        <Heading size={'xs'} textAlign='center' w='100%'>Canceled</Heading>
                                    </Center>
                                </Button>
                            </Box> : 
                            <Box flex={1} mx={4}>
                                <Button w='100%' variant={ this.state.status == 'rejected' ? "subtle" : "ghost" }
                                    onPress={() => { this.fileterAction('rejected') }}>

                                    <Center>
                                        <MaterialCommunityIcons name="cancel" size={24} color="black" />
                                        <Heading size={'xs'} textAlign='center' w='100%'>Rejected</Heading>
                                    </Center>
                                </Button>
                            </Box>
                        }
                        
                        <Box flex={1} mr={4} alignItems='center'>
                            <Button w='100%' variant={ this.state.status == null ? "subtle" : "ghost" }
                                onPress={() => { this.fileterAction(null) }}>
                                
                                <Center>
                                    <Entypo name="progress-full" size={24} color="black" />
                                    <Heading size={'xs'} textAlign='center' w='100%'>All</Heading>
                                </Center>
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            </Box>

        </NativeBaseProvider>
    )
  }
}