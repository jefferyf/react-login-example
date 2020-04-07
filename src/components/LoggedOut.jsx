import React, { Component } from 'react';

class LoggedOut extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    await this.props.loginHandler(username, password);
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { username, password } = this.state;
    const { errorMessage } = this.props;

    return (
      <div className="App">

        {errorMessage ? <p>{errorMessage}</p> : null}

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">
              Username:
                  <input id="username" value={username} onChange={this.handleChange} />
            </label>
          </div>

          <div>
            <label htmlFor="password">
              Password:
                  <input id="password" type="password" value={password} onChange={this.handleChange} />
            </label>
          </div>

          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default LoggedOut;