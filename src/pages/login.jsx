import React, { Component, Fragment } from 'react';
import InputField from '../components/input_field';
import { Warning, Instructions, FinalNote, Purpose } from '../components/information';
import { sign_up } from '../actions/authentication';
import '../style/login.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_type: '',
            waiting_for_auth: false,
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
        const { state, props } = this;
        if (props.is_authenticated) {
            props.continue();
            return;
        }
        sign_up(state.user_type)
            .then(() => props.auth_update(true))
            .catch(() => this.sign_up_error);
        
        this.setState({...this.state, loading: true});
    }

    sign_up_error = () => {
        this.setState({ ...[this.state], fail: true });
    }

    render() {
        const { state, props } = this;

        
        const user_type_change = new_value => this.input_change('user_type', new_value);
        const continue_text = this.props.is_authenticated? 'Continue.' : 'Acknowledge and begin.';
        const waiting_for_auth = state.waiting_for_auth || props.loading;

        return (
            <div className='container'>
                <h2>Abusive intent detection in social media posts</h2>

                <div className='login_fields'>
                    <Purpose />
                    <Warning />
                    <Instructions />
                    {
                        !props.is_authenticated?
                        <Fragment>
                            <FinalNote />
                            <InputField 
                                value={ state.user_type } 
                                on_change={ user_type_change } 
                                name={ 'referral code' }
                                />
                        </Fragment>
                        :
                        null
                    }
                    
                    <div className='submit'>
                        <input type='button' value={ continue_text } onClick={ this.submit } disabled={ waiting_for_auth } />
                    </div>
                </div>
            </div>
        );
    }
}

export default Login