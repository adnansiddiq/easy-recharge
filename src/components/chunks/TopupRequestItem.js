import React, {Component} from 'react'
import { 
    Box,
    Flex,
    Heading,
    Text
} from 'native-base';
import moment from 'moment';

export default class TopupRequestItem extends Component {

    getStateDate() {
        const {request} = this.props;

        if (request.approved_at != null) {
            return moment.utc(request.sent_at).local().format('DD MMM YYYY, hh:mm a');
        }

        if (request.rejected_at != null) {
            return moment.utc(request.rejected_at).local().format('DD MMM YYYY, hh:mm a');
        }
    }

    getStatusLayout() {

        const {request} = this.props;

        if (request.rejected_at != null) {
            return (
                <Heading fontSize={'lg'}
                    color={'red.500'}
                    textAlign='left'>REJECTED</Heading>
            );
        }

        if (request.approved_at != null) {
            return (
                <Heading fontSize={'lg'}
                    color={'green.500'}
                    textAlign='left'>Approved</Heading>
            );
        }

        return (
            <Heading fontSize={'lg'}
                color={'blue.400'}
                textAlign='left'>PENDING</Heading>
        );

    }

    render() {
        const { request } = this.props;

        return (
            <Box m={1} bg='white' rounded='md' shadow='1' borderWidth={1} borderColor='gray.200'>
                <Flex direction='row'px={3} >
                    <Box flex={1} py={2}>
                        { this.getStatusLayout() }
                        <Text fontSize='xs' color='gray.500' textAlign={'left'} mt={1}>
                            { moment.utc(request.created_at).local().format('DD MMM YYYY, hh:mm a') }
                        </Text>
                    </Box>

                    <Box h={'60'} justifyContent='center'>
                        <Heading p={2} 
                            fontSize={'xl'} 
                            alignSelf={'center'} 
                            color={'green.600'} 
                            minW='60' 
                            textAlign='center' 
                            bg={'blue.100'} 
                            rounded='lg' shadow={1} >
                                { request.amount }
                        </Heading>
                    </Box>
                    
                </Flex>
            </Box>
        )
    }
}
