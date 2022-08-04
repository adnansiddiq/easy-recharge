import { Text, View } from 'react-native'
import React, { PureComponent } from 'react'
import { Box, Button, Spinner } from 'native-base'

export default class LoadMore extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      loading: props.loading,
    }
    this.timeout = null
  }

  componentWillUnmount() {
    console.log("LoadMore unmount")
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  render() {
    return (
        <Box p={2}>
        { this.state.loading ? 
            <Spinner size={'lg'} /> :
            <Button variant={'outline'} onPress={() => { 
              this.setState({
                loading: true
              })
              this.timeout = setTimeout(() => {
                this.setState({
                  loading: false
                })  
              }, 2000);
              this.props.loadMore() 

            }}>Load More</Button>
        }
    </Box>
    )
  }
}