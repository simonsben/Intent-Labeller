import React, { Component } from 'react';
import {authenticate} from './actions/authentication';
import {request_text} from './actions/retrieve';
import Login from './pages/login';
import Label from './pages/label';
import './App.scss';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_token: null,
      user_id: null
    };

    this.login = this.login.bind(this);
    this.make_request = this.make_request.bind(this);
  }

  login = (username, password) => {
    const auth_token = authenticate(username, password);
    this.setState({...this.state, auth_token});
  }

  make_request = (previous, update_callback) => {
    const {auth_token, user_id} = this.state;
    return request_text(auth_token, user_id, previous, update_callback);
  }

  render() {
    const is_authenticated = this.state.auth_token != null;
    return (
      <div className='base'>
        {
          !is_authenticated?
          <Login login={this.login}/>
          :
          <Label make_request={this.make_request}/>
        }
      </div>
    );
  }
}

export default App;
