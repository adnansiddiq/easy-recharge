import React, { Component } from 'react'
import { Box, Center, FlatList, NativeBaseProvider, Spinner } from 'native-base'
import LoadMore from './chunks/LoadMore';
import ajax from '../helper/ajax';
import Loading from './Loading';
import TransactionItem from './chunks/TransactionItem';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { Dimensions } from 'react-native';
import NoRecord from './chunks/NoRecord';

export default class Transaction extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2;
            }),
            data: [],
            page: 1,
        }

        this.requestInProgress = false
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

        console.log("Load Transaction Data")
        this.requestInProgress = true
        if (this.state.page == 1) { 
            this.showLoding(true)
        }
        const response = await ajax.getTransactions(this.props.accessToken, this.state.page);

        this.showLoding(false)

        this.requestInProgress = false
        this.setState({
            dataProvider: this.state.dataProvider.cloneWithRows(
                [...this.state.data, ...response.transactions.data]
            ),
            data : [...this.state.data, ...response.transactions.data],
            page: this.state.page + 1,
            haveMore: response.transactions.length == 25,
        });
    }

    getLayoutProvider = () => {
        return new LayoutProvider(
            () => {
              return 'TransactionItem';
            },
            (type, dim) => {
                if (type == 'TransactionItem') {
                    dim.width = Math.round(Dimensions.get('window').width * 1000) / 1000 - 2;
                    dim.height = 41;     
                } else {
                    dim.width = 0
                    dim.height = 0
                }
            }
          ); 
    }
    
    render() {
        return (
        <NativeBaseProvider>

            <Loading ref={this.loadingRef} />

            <Box flex={1} bg='blue.100' safeArea>

            { this.state.data.length === 0 ? <NoRecord flex={1}/> :

                <RecyclerListView
                    flex={1}
                    contentContainerStyle={{ margin: 1 }}
                    onEndReached= { () => {
                        if (this.haveMore && !this.requestInProgress) {
                            this.loadData()
                        }
                    }}
                    dataProvider={this.state.dataProvider}
                    rowRenderer={ (type, data) => {
                        return <TransactionItem item={data} />
                    }}
                    layoutProvider={ this.getLayoutProvider() }
                    renderFooter={ () => {
                        return this.requestInProgress ?
                            <Spinner size={'lg'} /> : 
                            <Box h={2} />
                    }}
                />
            }
            </Box>

        </NativeBaseProvider>
        )
    }
}