import React, { Component } from 'react';
import InputField from '../components/input_field';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };

        this.input_change = this.input_change.bind(this);
        this.submit = this.submit.bind(this);
    }

    input_change = (state_key, new_value) => {
        this.setState({...this.state, [state_key]: new_value.target.value});
    }

    submit = () => {
        const {user, password} = this.state;
        this.props.login(user, password);
    }

    render() {
        const {state} = this;
        
        const user_change = new_value => this.input_change('user', new_value);
        const pass_change = new_value => this.input_change('password', new_value);

        return (
            <div className='container center'>
                <div className='login_fields'>
                    <div><h1>Enter user id and password here.</h1></div>
                    <InputField value={state.user} on_change={user_change} name={'user id'}/>
                    <InputField value={state.password} on_change={pass_change} name={'password'} input_type='password'/>
                    
                    <div className='form_submit'>
                        <input type='button' value='Submit' onClick={this.submit}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login