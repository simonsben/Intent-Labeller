import React, { Component, Fragment } from 'react';
import { is_authenticated } from './actions/authentication';
import Login from './pages/login';
import Labeller from './pages/labeller';


class App extends Component {
    constructor(props) {
        super(props);

        const has_local_token = is_authenticated(this.sign_up_complete);

        this.state = {
            is_authenticated: has_local_token,
            loading: has_local_token
        }

        this.sign_up_complete = this.sign_up_complete.bind(this);
    }

    sign_up_complete = ( is_authenticated ) => {
        console.log('Authenticate', is_authenticated);
        this.setState({ ...[this.state], is_authenticated, loading: false });
    }

    render() {
        const { is_authenticated, loading } = this.state;
        return (
            <div className='base_container'>
                {
                    !is_authenticated?
                    <Login loading={ loading } sign_up_complete={ this.sign_up_complete } />
                    :
                    <Labeller />
                }
            </div>
        );
    }
}

export default App;
