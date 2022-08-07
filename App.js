import React from 'react';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Navigation from './src/components/Navigation';
import Splash from './src/components/Splash';

import { Provider } from 'react-redux'  
import store from './src/reducers/store';
import AdminNavigation from './src/components/admin/AdminNavigation';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSplash : true,
      accessToken : null,
      user: null,
    };

    this.timeout = null
  }

  

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        showSplash: false
      });
    }, 3000);
  }

  componentWillUnmount() {
    console.log('App Unmount');
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  setAuth = (response) => {
    console.log(response.user);
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

      if (this.state.user.role == 'user') {
        return (
          <Navigation user={this.state.user} accessToken={this.state.accessToken} logout={ this.logout.bind(this) } />
        );
      }

      if (this.state.user.role == 'admin') {
        return (
          <AdminNavigation user={this.state.user} accessToken={this.state.accessToken} logout={ this.logout.bind(this) } />
        );
      }
    } else {

      return (
        <Login onLoginSuccess={ this.setAuth } />
      );
    }
  }
}

export default App;
