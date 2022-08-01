import React from 'react';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Navigation from './src/components/Navigation';
import Splash from './src/components/Splash';

import { Provider } from 'react-redux'  
import store from './src/reducers/store';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    showSplash : true,
    accessToken : null,
    user: null,
    timeout: null,
  };

  componentDidMount() {
    const timeout = setTimeout(() => {
      this.setState({
        showSplash: false
      });
    }, 3000);

    this.setState({
      timeout: timeout,
    });
  }

  componentWillUnmount() {
    console.log('App Unmount');
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
  }

  setAuth = (response) => {
    this.setState({
      accessToken: response.access_token,
      user: response.user
    });
  }

  logout() {
    console.log('logout call');

    this.setState({
      accessToken: null,
      user: null,
    });
  }

  render() {


    if (this.state.showSplash) {
      return (
        <Splash />
      );
    } else if (this.state.accessToken != null) {
      return (
        <Navigation user={this.state.user} accessToken={this.state.accessToken} logout={ this.logout.bind(this) } />
      );
    } else {

      return (
        <Login onLoginSuccess={ this.setAuth } />
      );
    }
  }
}

export default App;
