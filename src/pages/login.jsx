import React, { Component } from 'react';
import InputField from '../components/input_field';
import { Warning, Instructions, FinalNote } from '../components/information';
import { signup as sign_up } from '../actions/authentication';
import '../style/login.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_type: '',
            loading: props.loading,
            fail: false
        };

        this.input_change = this.input_change.bind(this);
        this.sign_up_error = this.sign_up_error.bind(this);
        this.submit = this.submit.bind(this);
    }

    input_change = (state_key, new_value) => {
        this.setState({...this.state, [state_key]: new_value.target.value});
    }

    submit = () => {
        const { user_type } = this.state;
        sign_up(user_type, this.sign_up_error)
            .then(() => this.props.sign_up_complete(true))
        
        this.setState({...[this.state], loading: true});
    }

    sign_up_error = () => {
        this.setState({ ...[this.state], fail: true });
    }

    render() {
        const {state} = this;
        
        const user_type_change = new_value => this.input_change('user_type', new_value);

        return (
            <div className='container'>
                <h2>Make a new profile</h2>

                <div className='login_fields'>
                    <Warning />
                    <Instructions />
                    <FinalNote />
                    <InputField value={ state.user_type } on_change={ user_type_change } name={ 'referral code' }/>                    
                    
                    <div className='submit'>
                        <input type='button' value='Submit' onClick={this.submit} disabled={ state.loading } />
                    </div>
                </div>
            </div>
        );
    }
}

export default Login