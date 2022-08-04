import { Heading, Text } from 'native-base';
import React, { Component } from 'react'

export default class Timer extends Component {

    state = {
        timer: 0,
        interval : null,
    };

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.setState({
            timer: this.props.timer
        });

        const interval = setInterval(() => {
            var timer = this.state.timer;
            timer = timer - 1;
            this.setState({
                timer : timer
            });
        }, 1000);

        this.setState({
            interval: interval
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

  render() {
    return (
      <Heading fontSize={'6xl'}>{ this.state.timer }</Heading>
    )
  }
}