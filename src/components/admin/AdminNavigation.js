import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RechargeRequestList from '../RechargeRequestList';
import RechargeRequestDetail from '../RechargeRequestDetail';

const Stack = createNativeStackNavigator();

export default class AdminNavigation extends Component {
  
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

                <Stack.Screen name="RechargeRequestList" options={{ title: 'Recharge Requests' }} >
                    {(props) => <RechargeRequestList {...props} accessToken={this.props.accessToken} admin />}
                </Stack.Screen>

                <Stack.Screen name="RechargeRequestDetail" options={{ title: 'Mobile Recharge' }} >
                    {(props) => <RechargeRequestDetail {...props} accessToken={this.props.accessToken} admin />}
                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    )
  }
}