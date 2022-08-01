import React, { Component } from 'react'
import { 
    Box, 
    FlatList, 
    NativeBaseProvider
} from 'native-base'
import PropTypes from 'prop-types'
import ajax from '../helper/ajax';
import RechargeRequestItem from './chunks/RechargeRequestItem';
import Loading from './Loading';
import LoadMore from './chunks/LoadMore';

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
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log("Recharge Requests");
        this.loadData();
    }

    async loadData() {
        this.setState({
            loading: true,
        })

        const response = await ajax.getRechargeRequests(this.props.accessToken, this.state.page);
        
        this.setState({
            data : [ ...this.state.data, ...response.user_requests],
            dataLoaded : true,
            page: this.state.page + 1,
            haveMore: response.user_requests.length == 25,
            loading: false,
        });
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
                    data={ this.state.data } 
                    renderItem={ ( {
                        item
                    }) => <RechargeRequestItem request={item} onSelect={ this.itemClicked.bind(this) } /> } 
                    keyExtractor={item => item.id} 
                    ListFooterComponent={ ( this.state.haveMore &&
                        <LoadMore loading={ this.state.loading } loadMore={ this.loadData.bind(this) }/>
                    )} />

            </Box>

        </NativeBaseProvider>
    )
  }
}