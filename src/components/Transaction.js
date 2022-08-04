import React, { Component } from 'react'
import { Box, FlatList, NativeBaseProvider } from 'native-base'
import LoadMore from './chunks/LoadMore';
import ajax from '../helper/ajax';
import Loading from './Loading';
import TransactionItem from './chunks/TransactionItem';

export default class Transaction extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            page: 1,
        }

        this.loadingRef = React.createRef()
    
    }

    showLoding(show) {
        this.loadingRef.current.setState({
            show: show
        });
    }

    async componentDidMount() {
        this.loadData();
    }

    async loadData() {

        if (this.state.page == 1) { 
            this.showLoding(true)
        }
        const response = await ajax.getTransactions(this.props.accessToken, this.state.page);

        this.showLoding(false)

        this.setState({
            data : [ ...this.state.data, ...response.transactions.data],
            page: this.state.page + 1,
            haveMore: response.transactions.length == 25,
        });
    }
    
    render() {
        return (
        <NativeBaseProvider>

            { <Loading ref={this.loadingRef} /> }

            <Box flex={1} bg='blue.100' safeArea>

                <FlatList 
                    data={ this.state.data } 
                    renderItem={ ( {
                        item
                    }) => <TransactionItem item={item} /> } 
                    keyExtractor={item => item.id} 
                    ListFooterComponent={ ( this.state.haveMore &&
                        <LoadMore loadMore={ this.loadData.bind(this) }/>
                    )} />
            </Box>

        </NativeBaseProvider>
        )
    }
}