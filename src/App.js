import React, { Component } from 'react';
import { is_authenticated } from './actions/authentication';
import { request_text } from './actions/retrieve';
import Login from './pages/login';
import Label from './pages/label';
import './App.scss';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_authenticated: is_authenticated()
        }

        this.signup_complete = this.signup_complete.bind(this);
    }

    signup_complete = () => {
        this.setState({is_authenticated: true});
    }

    render() {
        const { is_authenticated } = this.state;
        return (
            <div className='base'>
                {
                    !is_authenticated?
                    <Login signup_complete={ this.signup_complete } />
                    :
                    <Label/>
                }
            </div>
        );
    }
}

export default App;
