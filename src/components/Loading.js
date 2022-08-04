import { Box, Center, Text, Spinner} from 'native-base'
import React, { PureComponent } from 'react'

export default class Loading extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      loading: false,
    }
  }

  render() {
    return ( this.state.show &&
        <Box position='absolute' top={0} bottom={0} left={0} right={0} style={{ zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <Center flex={1} justifyContent="center" alignItems="center">
                <Box justifyContent="center" alignItems="center" w={100} h={100} rounded="lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <Spinner size='lg' color='white'></Spinner>

                    <Text mt={2} color='white'>Loading..</Text>
                </Box>
            </Center>
        </Box>
    )
  }
}
