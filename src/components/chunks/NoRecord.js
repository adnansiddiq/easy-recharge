import {Box, Center} from 'native-base'
import React, {PureComponent} from 'react'

export default class NoRecord extends PureComponent {

    render() {
        return (
            <Box>
                <Center w={'100%'} h={'100%'}>
                    No Record Found.
                </Center>
            </Box>
        )
    }
}
