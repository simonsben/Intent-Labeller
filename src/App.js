import React, { Component } from 'react';
import Login from './pages/login';
import './App.scss';
import {authenticate} from './actions/authentication';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_token: null
    };

    this.login = this.login.bind(this);
  }

  login = (username, password) => {
    const auth_token = authenticate(username, password);
    this.setState({...this.state, auth_token});
  }

  render() {
    return (
      <div className='base'>
        <Login login={this.login}/>
      </div>
    );
  }
}

export default App;
