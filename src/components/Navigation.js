import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import RechargeRequest from './RechargeRequest';
import RechargeRequestDetail from './RechargeRequestDetail';
import RechargeRequestList from './RechargeRequestList';
import Transaction from './Transaction';
import TopupRequestList from './TopupRequestList';

const Stack = createNativeStackNavigator();

export default class Navigation extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        accessToken: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
    }
  
    render() {
    return (
    <NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen name="Home" >
            {(props) => <Home {...props} user={this.props.user} accessToken={this.props.accessToken} logout={this.props.logout} />}
          </Stack.Screen>

          <Stack.Screen name="RechargeRequest" options={{ title: 'Recharge Request' }}>
            {(props) => <RechargeRequest {...props} accessToken={this.props.accessToken} />}
          </Stack.Screen>

          <Stack.Screen name="RechargeRequestDetail" options={{ title: 'Mobile Recharge' }} >
            {(props) => <RechargeRequestDetail {...props} accessToken={this.props.accessToken} />}
          </Stack.Screen>

          <Stack.Screen name="RechargeRequestList" options={{ title: 'Recharge Requests' }} >
            {(props) => <RechargeRequestList {...props} accessToken={this.props.accessToken} />}
          </Stack.Screen>

          <Stack.Screen name="TopupRequestList" options={{ title: 'Topup Requests' }} >
            {(props) => <TopupRequestList {...props} accessToken={this.props.accessToken} />}
          </Stack.Screen>

          <Stack.Screen name="Transaction" options={{ title: 'Transactions' }} >
            {(props) => <Transaction {...props} accessToken={this.props.accessToken} />}
          </Stack.Screen>

        </Stack.Navigator>
    </NavigationContainer>
    )
  }
}