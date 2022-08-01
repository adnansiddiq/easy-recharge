import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Box, Button, Spinner } from 'native-base'

export default class LoadMore extends Component {

  render() {
    return (
        <Box p={2}>
        { this.props.loading ? 
            <Spinner size={'lg'} /> :
            <Button variant={'outline'} onPress={() => { this.props.loadMore() }}>Load More</Button>
        }
    </Box>
    )
  }
}