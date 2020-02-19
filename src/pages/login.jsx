import React, { Component } from 'react';
import InputField from '../components/input_field';
import { signup } from '../actions/authentication';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_type: ''
        };

        this.input_change = this.input_change.bind(this);
        this.submit = this.submit.bind(this);
    }

    input_change = (state_key, new_value) => {
        this.setState({...this.state, [state_key]: new_value.target.value});
    }

    submit = () => {
        const { user_type } = this.state;
        signup(user_type)
            .then(() => this.props.signup_complete())
    }

    render() {
        const {state} = this;
        
        const user_type_change = new_value => this.input_change('user_type', new_value);
        const pass_change = new_value => this.input_change('password', new_value);

        return (
            <div className='container center'>
                <div className='login_fields'>
                    <div><h1>If you have a referral code, please enter it here.</h1></div>
                    <InputField value={ state.user_type } on_change={ user_type_change } name={ 'referral code' }/>
                    {/* <InputField value={state.password} on_change={pass_change} name={'password'} input_type='password'/> */}
                    
                    <div className='form_submit'>
                        <input type='button' value='Submit' onClick={this.submit}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login