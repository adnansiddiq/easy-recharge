import React, { Component } from 'react'
import { Box, FlatList, NativeBaseProvider, Text } from 'native-base'
import LoadMore from './chunks/LoadMore';
import ajax from '../helper/ajax';
import Loading from './Loading';
import TransactionItem from './chunks/TransactionItem';

export default class Transaction extends Component {

    state = {
        initalDataLoaded: false,
        loading: false,
        data: [],
        page: 1,
    };

    async componentDidMount() {
        console.log("Transaction Requests");
        this.loadData();
    }

    async loadData() {
        this.setState({
            loading: true,
        })

        const response = await ajax.getTransactions(this.props.accessToken, this.state.page);

        this.setState({
            data : [ ...this.state.data, ...response.transactions.data],
            initalDataLoaded : true,
            page: this.state.page + 1,
            haveMore: response.transactions.length == 25,
            loading: false,
        });
    }
    
    render() {
        return (
        <NativeBaseProvider>

            { !this.state.initalDataLoaded && <Loading /> }

            <Box flex={1} bg='blue.100' safeArea>

                <FlatList 
                    data={ this.state.data } 
                    renderItem={ ( {
                        item
                    }) => <TransactionItem item={item} /> } 
                    keyExtractor={item => item.id} 
                    ListFooterComponent={ ( this.state.haveMore &&
                        <LoadMore loading={ this.state.loading } loadMore={ this.loadData.bind(this) }/>
                    )} />

            </Box>

        </NativeBaseProvider>
        )
    }
}