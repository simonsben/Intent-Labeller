import React, {Component, Fragment} from 'react';
import { request_text } from '../actions/retrieve';
import { deep_copy } from '../actions/utilities';

const init_state = {
    index: 0,
    contexts: [],
    intent_labels: [],
    abuse_labels: [],
    current_tuple: {}
};

const label_map = {
    'doesn\'t contain': 'POSITIVE',
    'contains': 'NEGATIVE'
};
const labels = Object.keys(label_map);

const generate_labeller = (target_label, add_label, selected=null) => {   

    return (
        <div key={target_label}>
            {
                labels.map(label => (
                    <div 
                        className={'marking_label ' + ((selected === label)? 'selected' : '')} 
                        onClick={() => add_label(target_label, label)} 
                        key={label + target_label}>
                            <div>{label + ' ' + target_label}</div>
                    </div>
                ))
            }
        </div>
    );
};

class Label extends Component {
    constructor(props) {
        super(props);

        this.state = deep_copy(init_state);
        this.update_contexts = this.update_contexts.bind(this);
        this.add_label = this.add_label.bind(this);
    }

    make_request = () => {
        const {contexts, intent_labels, abuse_labels} = this.state;
        let labels = null;
        if (contexts.length > 0)
            labels = intent_labels.map((label, index) => {
                return { intent_label: label, abuse_label: abuse_labels[index] }
            });

        request_text(this.update_contexts, labels);
    }

    update_contexts = contexts => {
        let new_state = deep_copy(init_state);
        new_state.contexts = contexts;
        this.setState(new_state);
    }

    add_label = (target_label, label) => {
        const {state} = this;
        let { current_tuple } = state;

        current_tuple[target_label] = label_map[label];

        if (Object.keys(current_tuple).length >= 2) {
            let { abuse_labels, intent_labels } = state;
            abuse_labels.push(current_tuple.abuse);
            intent_labels.push(current_tuple.intent);

            current_tuple = {};
            this.setState({ ...state, current_tuple, abuse_labels, intent_labels });
        }
        this.setState({...state, current_tuple});
    }

    is_done = () => !!this.state.contexts;
    

    render() {
        const { state, add_label, is_done } = this;
        const index = state.intent_labels.length;

        if (is_done())
            return (
                <div>Wow, looks like you're done!</div>
            );

        const context = (is_done() || index >= state.contexts.length)? null : state.contexts[index];

        if (!state.done && !context) this.make_request();

        return (
            <Fragment>
                {
                    !context? null :
                    <div className='marking_window'>
                        {
                            ['intent', 'abuse'].map(variant => generate_labeller(variant, add_label, state.current_tuple[variant]))
                        }
                    </div>
                }
                <div className='container center'>
                    <div className='context'>{!context? 'Loading data...' : context}</div>
                </div>
            </Fragment>
        )
    }
}

export default Label;
