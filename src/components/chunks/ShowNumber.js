import { Button, Text } from 'native-base'
import React, { Component } from 'react'

export default class ShowNumber extends Component {

    state = {
        showNumber: false
    }

  render() {

    if (this.state.showNumber) {
        return (
            <Text>{ this.props.phoneNumber }</Text>
        )
    }  
        
    return (
        <Button variant={'link'} onPress={() => { this.setState({showNumber: true} )}}>Show Number</Button>
    )
  }
}
