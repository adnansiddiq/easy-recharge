import { Box, Center, Divider, Heading, Text } from 'native-base'
import React, { Component } from 'react'
import ShowNumber from './ShowNumber'

export default class VerifyInfo extends Component {

  render() {
      const {userName, phoneNumber, balance} = this.props
    return (
        <Box flex={1} mt={3} p={2} bg='amber.100' rounded={'lg'} borderWidth={1} borderColor={'gray.400'}>
            <Center h={'100%'}>
                <Heading color='gray.600'>Verify Info</Heading>
                <Box flex={1}></Box>
                <Divider />
                <Box flex={1}></Box>
                <Text color='gray.600' fontSize={'xl'}>{ userName }</Text>
                <Box flex={1}></Box>

                <ShowNumber phoneNumber={phoneNumber} />
                
                <Box flex={1}></Box>
                <Center mt={2} w='100%'>
                    <Heading w={'50%'} textAlign='center' bg={'white'} fontSize='3xl'>{ balance }</Heading>
                </Center>
                <Box flex={1}></Box>
            </Center>
        </Box>
    )
  }
}