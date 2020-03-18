import React, { Component } from 'react';
import Login from './pages/login';
import Labeller from './pages/labeller';
import { is_authenticated } from './actions/authentication';


class App extends Component {
    constructor(props) {
        super(props);

        const has_local_token = is_authenticated(this.auth_update);

        this.state = {
            is_authenticated: has_local_token,
            loading: has_local_token,
            labelling: false,
        }

        this.continue = this.continue.bind(this);
        this.auth_update = this.auth_update.bind(this);
    }

    auth_update = ( is_authenticated ) => {
        console.log('Authenticated:', is_authenticated);
        const { state } = this;
        this.setState({ ...state, is_authenticated, loading: false, labelling: !state.loading });
    };
    continue = () => this.setState({ ...this.state, labelling: true });

    render() {
        const { is_authenticated, loading, labelling } = this.state;
        return (
            <div className='base_container'>
                {
                    ( !labelling || !is_authenticated )?
                    <Login 
                        loading={ loading } 
                        is_authenticated={ is_authenticated } 
                        continue={ this.continue } 
                        auth_update={this.auth_update} />
                    :
                    <Labeller />
                }
            </div>
        );
    }
}

export default App;
