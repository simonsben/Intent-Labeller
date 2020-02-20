import React, { Component } from 'react';
import { deep_copy } from '../actions/utilities';
import { request_text } from '../actions/retrieve';
import { ThankYou } from '../components/thank_you';
import { generate_label, label_map } from '../components/label';
import '../style/label.scss';

const init_state = {
    index: 0,
    contexts: [],
    intent_labels: [],
    abuse_labels: [],
    current_tuple: {}
};

class Labeller extends Component {
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
        let callback = () => {};

        if (Object.keys(current_tuple).length >= 2) {
            let { abuse_labels, intent_labels } = state;
            abuse_labels.push(current_tuple.abuse);
            intent_labels.push(current_tuple.intent);

            current_tuple = {};
            this.setState({ ...[this.state], current_tuple, abuse_labels, intent_labels })
        }
        else
            this.setState({...state, current_tuple}, callback);
    }

    is_done = () => {
        const { contexts } = this.state;
        return (contexts === null) || typeof contexts === 'undefined';
    };
    

    render() {
        const { state, add_label, is_done } = this;
        const index = state.intent_labels.length;

        if (is_done())
            return <ThankYou />

        const context = (is_done() || index >= state.contexts.length)? null : state.contexts[index];

        if (!state.done && !context) this.make_request();

        return (
            <div className='marking_window'>
                <div className='marking_content'>
                    {!context? 'Loading data...' : context}
                </div>

                {
                    ['intent', 'abuse'].map(variant => generate_label(variant, add_label, state.current_tuple[variant]))
                }
            </div>
        )
    }
}

export default Labeller;
