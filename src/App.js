import React, { Component } from 'react';
import LoggedOut from './components/LoggedOut.jsx';
import { LoggedIn } from './components/LoggedIn';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      errorMessage: '',
      token: ''
    }
  }

  loginAsync = async (username, password) => {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password })
    };

    try {
      let response = await fetch('https://reqres.in/api/login', settings);
      let data = await response.json();
      if (response.ok) {
        this.setState({         
          isLoggedIn: true,
          token: data.token
        });
      } else {
        this.setState({ errorMessage: data.error });
      }
    } catch (e) {
      this.setState({ errorMessage: JSON.stringify(e) });
    }
  }

  logout = () => {
    this.setState({
      isLoggedIn: false,
      token: '',
      errorMessage: 'Logged out'
    });
  }  

  render() {
    const { errorMessage, isLoggedIn, token } = this.state;

    return (
      <div className="App">
        {!isLoggedIn
          ? <LoggedOut errorMessage={errorMessage} loginHandler={this.loginAsync} />
          : <LoggedIn token={token} logoutHandler={this.logout} />
        }        
      </div>
    );
  }
  
}

export default App;
