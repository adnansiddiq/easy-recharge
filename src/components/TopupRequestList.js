import React, {PureComponent} from 'react'
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
import {Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {Dimensions} from 'react-native';
import NoRecord from './chunks/NoRecord';
import TopupRequestItem from './chunks/TopupRequestItem';

export default class TopupRequestList extends PureComponent {

    static propTypes = {
        accessToken: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            dataProvider: new DataProvider(
                (r1, r2) => {
                    return r1 !== r2;
                }
            ),
            data: [],
            page: 1,
            haveMore: false,
        }

        this.requestInProgress = false

        this.loadingRef = React.createRef()
    }

    async componentDidMount() {
        this.loadData();
    }

    showLoding(show) {
        this.loadingRef.current.setState({show: show});
    }

    async loadData() {
        console.log("Load More")
        this.requestInProgress = true

        if (this.state.page === 1) {
            this.showLoding(true)
        }

        const response = await ajax.getTopupRequests(this.props.admin, this.props.accessToken, this.state.page);

        this.requestInProgress = false

        this.setState({
            dataProvider: this.state.dataProvider.cloneWithRows(
                [
                    ...this.state.data,
                    ... response.data
                ]
            ),

            data: [
                ...this.state.data,
                ... response.data
            ],
            page: this.state.page + 1,
            haveMore: response.data.length == 25
        });

        this.showLoding(false)
    }

    getLayoutProvider = () => {
      return new LayoutProvider(
          () => {
            return 'TopupRequest';
          },
          
          (type, dim) => {
            switch (type) {
              case 'TopupRequest':
                dim.width = Math.round(Dimensions.get('window').width * 1000) / 1000 - 4;
                dim.height = 65;
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
                                return <TopupRequestItem request={data} />;
                            }}
                            renderFooter={ () => {
                                return this.inProgressNetworkReq ? 
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
