import moment from 'moment';
import { Box, Divider, Flex, Text } from 'native-base'
import React, { Component } from 'react'

export default class TransactionItem extends Component {
  
    title = {
        jazz: 'Jazz/Warid',
        ufone: 'Ufone',
        telenor: 'Telenor',
        zong: 'Zong',
        jazz_cash: 'Jazz Cash',
        easy_paisa: 'Easy Paisa'
    }

    render() {
        const { item } = this.props;
        return (
        <Box bg={ item.amount > 0 ? 'green.100' : 'red.100' }>
            <Flex direction='row' h={8} alignItems={'center'}>
                <Text flex={1} px={1}>
                    { moment.utc(item.created_at).local().format('DD MMM, hh:mm a') }
                </Text>
                <Divider orientation='vertical' />
                <Text w={100} px={'1'}>{ item.paymentable.type ? this.title[item.paymentable.type] : 'Topup' }</Text>
                <Divider orientation='vertical' />
                <Text w={60} textAlign='center' bold>{ item.amount > 0 ? item.amount : '-'  }</Text>
                <Divider orientation='vertical' />
                <Text w={60} textAlign='center' bold>{ item.amount < 0 ? item.amount : '-' }</Text>
            </Flex>
            <Divider orientation='horizental' />
        </Box>
        )
    }
}