import React, { Component } from 'react';
import { deep_copy } from '../actions/utilities';
import { request_text } from '../actions/retrieve';
import { ThankYou } from '../components/thank_you';
import { generate_label, label_map } from '../components/label';
import '../style/label.scss';

const init_state = {
    index: 0,
    contexts: [],
    labels: [],
    current_tuple: {},
    hovering: false
};
const skip_tuple = {
    abuse: 'SKIP',
    intent: 'SKIP'
};

class Labeller extends Component {
    constructor(props) {
        super(props);

        this.state = deep_copy(init_state);
        this.update_contexts = this.update_contexts.bind(this);
        this.add_label = this.add_label.bind(this);
    }

    make_request = () => {
        const { labels } = this.state;
        request_text(this.update_contexts, labels);
    }

    update_contexts = contexts => {
        let new_state = deep_copy(init_state);
        new_state.contexts = contexts;
        this.setState(new_state);
    }

    // TODO associate labels with context ID
    add_label = (target_label, label, skip=false) => {
        const { state } = this;
        let { current_tuple, labels } = state;
        const { context_id } = state.contexts[labels.length];

        if (skip)
            current_tuple = { ...skip_tuple };
        else 
            current_tuple[target_label] = label_map[label];
        current_tuple['context_id'] = context_id;

        if (Object.keys(current_tuple).length >= (Object.keys(skip_tuple).length + 1)) {
            let { labels } = state;
            labels.push(current_tuple);

            current_tuple = {};
        }
        this.setState({ ...state, current_tuple, labels });
    }

    is_done = () => {
        const { contexts } = this.state;
        return (contexts === null) || typeof contexts === 'undefined';
    };

    over = () => this.setState({ ...[this.state], hovering: true });
    off = () => this.setState({ ...[this.state], hovering: false });
    

    render() {
        const { state, add_label, is_done } = this;
        const index = state.labels.length;

        if (is_done())
            return <ThankYou />;

        const content = (index >= state.contexts.length)? null : state.contexts[index].content;

        if (!state.done && !content) this.make_request();

        const content_style = 'marking_content' + (state.hovering? ' skip' : '');

        return (
            <div className='marking_window'>
                <div 
                    className={content_style} 
                    onMouseEnter={this.over} 
                    onMouseLeave={this.off} 
                    onClick={() => add_label(null, null, true)}
                    >
                    {
                        !content? 'Loading data...' :
                        ( state.hovering? 'skip' : content )
                    }
                </div>

                {
                    ['intent', 'abuse'].map(variant => generate_label(variant, add_label, state.current_tuple[variant]))
                }
            </div>
        )
    }
}

export default Labeller;
