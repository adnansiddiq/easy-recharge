import React from 'react'

import { Text, NativeBaseProvider, Box, Heading, Center } from 'native-base'

class Splash extends React.Component {

    state = {
        loading: false
    }

    componentDidMount() {

        this.setState({
            loading : false
        });

        setTimeout(() => {

            this.setState({
                loading : true
            })
        }, 3000);
    }

    render() {
        return (
            <NativeBaseProvider>
                <Box flex={1} safeArea>

                    <Center h="100%">
                        <Heading size="2xl" color="blue.400">INVIGOSOL</Heading>
                        <Text mt={5} color="gray.300">0315 2335633</Text>
                    </Center>
                </Box>
            </NativeBaseProvider>
          );
    }
}

export default Splash;
