import React, { Component } from 'react';
import { is_authenticated } from './actions/authentication';
import Login from './pages/login';
import Label from './pages/label';
import './App.scss';


class App extends Component {
    constructor(props) {
        super(props);

        const has_local_token = is_authenticated(this.signup_complete);

        this.state = {
            is_authenticated: has_local_token,
            loading: has_local_token
        }

        this.signup_complete = this.signup_complete.bind(this);
    }

    signup_complete = ( is_authenticated ) => {
        console.log('Authenticate', is_authenticated);
        this.setState({ ...[this.state], is_authenticated, loading: false });
    }

    render() {
        const { is_authenticated, loading } = this.state;
        return (
            <div className='base'>
                {
                    !is_authenticated?
                    <Login loading={ loading } signup_complete={ this.signup_complete } />
                    :
                    <Label />
                }
            </div>
        );
    }
}

export default App;
