import React, { Component } from 'react'
import { Box, Flex, Heading, Image, Text } from 'native-base'
import moment from 'moment';
import { TouchableOpacity } from 'react-native';

export default class Transaction extends Component {

    images = {
        jazz : require('../../../assets/jazz.png'),
        ufone: require('../../../assets/ufone.png'),
        telenor: require('../../../assets/telenor.png'),
        zong: require('../../../assets/zong.png'),
        jazz_cash: require('../../../assets/jazzcash.png'),
        easy_paisa: require('../../../assets/easypaisa.png')
    };

    getStateDate = () => {
        const { request } = this.props;

        if (request.sent_at != null) {
            return moment.utc(request.sent_at).local().format('DD MMM YYYY, hh:mm a');
        }

        if (request.canceled_at != null) {
            return moment.utc(request.canceled_at).local().format('DD MMM YYYY, hh:mm a');
        }

        if (request.rejected_at != null) {
            return moment.utc(request.rejected_at).local().format('DD MMM YYYY, hh:mm a');
        }
    }

    getStatusLayout = () => {
        
        const { request } = this.props;
        
        if (request.rejected_at != null) {
            return (
                <Heading fontSize={'md'} color={'red.500'} textAlign='center'>REJECTED</Heading>
            );
        }

        if (request.sent_at != null) {
            return (
                    <Heading fontSize={'md'} color={'green.500'} textAlign='center'>SUCCESS</Heading>
            );
        }

        if (request.canceled_at != null) {
            return (
                    <Heading fontSize={'md'} color={'gray.500'} textAlign='center'>CANCELED</Heading>
            );
        }

        return (
                <Heading fontSize={'md'} color={'blue.400'} textAlign='center'>PENDING</Heading>
            );
    }

  render() {
      const { request } = this.props;
    return (
      <Box m={1} bg='white' rounded='md' shadow='1' borderWidth={1} borderColor='gray.200'>
          <TouchableOpacity onPress={() => { this.props.onSelect(request.id) }}>
        
          <Flex direction='row' px={3}>
              <Box w='60' h={100}>
                <Image flex={1} source={ this.images[request.type] } alt="Mobile Recharge" w='60' resizeMode={"contain"}></Image>
              </Box>
              <Box flex={1} py={2}>
                  { this.getStatusLayout() }
                  
                  <Text textAlign={'center'} bold fontSize={'xl'} color='gray.600' mt={1}>{ request.reference_number }</Text>

                  <Text fontSize='xs' color='gray.500' textAlign={'center'} mt={1}>
                    { moment.utc(request.created_at).local().format('DD MMM YYYY, hh:mm a') }
                  </Text>
              </Box>

              <Box h={100} justifyContent='center'>
                <Heading p={5} 
                    fontSize={'2xl'} 
                    alignSelf={'center'} 
                    color={'red.600'} 
                    minW='90' 
                    textAlign='center' 
                    bg={'blue.100'} 
                    rounded='lg' 
                    shadow={1} >

                        { request.amount }
                    </Heading>
              </Box>
          </Flex>
          </TouchableOpacity>
      </Box>
    )
  }
}