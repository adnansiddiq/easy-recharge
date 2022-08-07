import React, { PureComponent } from 'react'
import { 
    Box, 
    Button, 
    Center, 
    Flex, 
    Heading, 
    NativeBaseProvider,
    Spinner
} from 'native-base'
import PropTypes from 'prop-types'
import ajax from '../helper/ajax';
import RechargeRequestItem from './chunks/RechargeRequestItem';
import Loading from './Loading';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { Dimensions } from 'react-native';
import NoRecord from './chunks/NoRecord';

export default class RechargeRequestList extends PureComponent {

    static propTypes = {
        accessToken: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2;
            }),
            data : [],
            page: 1,
            haveMore: false,
            status: 'pending',
        }

        this.requestInProgress = false

        this.loadingRef = React.createRef()
    }

    async componentDidMount() {
        this.loadData();
    }

    showLoding(show) {
        this.loadingRef.current.setState({
            show: show
        });
    }

    async loadData() {
        console.log("Load More")
        this.requestInProgress = true
    
        if (this.state.page === 1) {
            this.showLoding(true)
        }

        const response = await ajax.getRechargeRequests(this.props.admin, this.props.accessToken, this.state.page, this.state.status,);

        this.requestInProgress = false

        this.setState({
            dataProvider: this.state.dataProvider.cloneWithRows(
                [
                    ...this.state.data,
                    ... response.user_requests
                ]
            ),

            data: [
                ...this.state.data,
                ... response.user_requests
            ],
            page: this.state.page + 1,
            haveMore: response.user_requests.length == 25
        });

        this.showLoding(false)
    }


    async fileterAction(status) {

        await this.setState({
            data : [],
            page: 1,
            haveMore: false,
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

    getLayoutProvider = () => {
        return new LayoutProvider(
            () => {
              return 'RechargeRequest';
            },
            
            (type, dim) => {
              switch (type) {
                case 'RechargeRequest':
                  dim.width = Math.round(Dimensions.get('window').width * 1000) / 1000 - 4;
                  dim.height = 108;
                  break;
                default:
                  dim.width = 0;
                  dim.heigh = 0;
              }
            }
          );
    }


  render() {
    return (
        <NativeBaseProvider>
            
            <Loading ref={ this.loadingRef } />

            <Box flex={1} bg='blue.100' safeArea>
                    { this.state.data.length === 0 ? <NoRecord flex={1}/> :

                        <RecyclerListView
                            flex={1}
                            contentContainerStyle={{ margin: 2 }}
                            onEndReached={() => {
                                if (this.state.haveMore && !this.requestInProgress) {
                                    this.loadData()
                                }
                            }}
                            layoutProvider={this.getLayoutProvider()}
                            dataProvider={this.state.dataProvider}
                            rowRenderer= { (type, data) => {
                                return <RechargeRequestItem request={data} onSelect={(reqID) => {
                                    this.itemClicked(reqID)
                                }} />;
                            }}
                            renderFooter={ () => {
                                return this.inProgressNetworkReq ? 
                                    <Spinner size={'lg'} /> : 
                                    <Box h={2} />
                            }}
                         />
                    }
                
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