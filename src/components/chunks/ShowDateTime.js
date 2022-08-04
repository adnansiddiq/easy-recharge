import React, { Component } from 'react'
import { Flex, Text } from 'native-base'
import moment from 'moment'

export default class ShowDateTime extends Component {
  render() {
      const {label, date} = this.props

    return (
        <Flex direction='row'>
            <Text flex={1} textAlign='center' fontSize='sm' color={'gray.400'}>{ label }:</Text>
            <Text flex={1} textAlign='center' fontSize='sm' mt={1}>
                { moment.utc(date).local().format('DD MMM YYYY, hh:mm a') }
            </Text>
        </Flex>
    )
  }
}