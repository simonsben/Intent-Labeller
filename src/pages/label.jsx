import React, {Component, Fragment} from 'react';

const init_state = {
    index: 0,
    contexts: [],
    intent_labels: [],
    abuse_labels: []
};

const label_map = {
    'doesn\'t contain': 0,
    'unsure if it contains': -1,
    'contains': 1
};
const labels = Object.keys(label_map);

const generate_labeller = (is_intent, add_label) => {
    const target_label = ' ' + (is_intent? 'intent' : 'abuse');
    
    return (
        <div key={target_label}>
            {
                labels.map(label => (
                    <div 
                        className='marking_label' 
                        onClick={() => add_label(true, label)} 
                        key={label + target_label}>
                            <div>{label + target_label}</div>
                    </div>
                ))
            }
        </div>
    );
};

class Label extends Component {
    constructor(props) {
        super(props);

        this.state = {...init_state};
        this.update_contexts = this.update_contexts.bind(this);
        this.add_label = this.add_label.bind(this);
    }

    make_request = () => {
        const {contexts, intent_labels, abuse_labels} = this.state;
        const previous = contexts.length === 0? null : {intent_labels, abuse_labels};
        this.props.make_request(previous, this.update_contexts);
    }

    update_contexts = new_contexts => this.setState({...init_state, contexts: new_contexts});

    add_label = (is_intent, label) => {
        const {state} = this;

        let {intent_labels, abuse_labels, index} = state;

        const current_labels = is_intent? intent_labels : abuse_labels
        const alternate_labels = is_intent? abuse_labels : intent_labels;
        
        current_labels.push(label);

        if (current_labels.length === alternate_labels.length) {
            index++;
            console.log('bumping index', index);
        }

        const target = is_intent? 'intent_labels' : 'abuse_labels';
        this.setState({...state, [target]: labels, index});
    }
    

    render() {
        const {state, add_label} = this;
        const context = state.index >= state.contexts.length? null : state.contexts[state.index];

        if (!context) this.make_request();

        return (
            <Fragment>
                {
                    !context? null :
                    <div className='marking_window'>
                        {
                            [true, false].map(variant => generate_labeller(variant, add_label))
                        }
                    </div>
                }
                <div className='container center'>
                    <div className='context'>{!context? 'Loading...' : context}</div>
                </div>
            </Fragment>
        )
    }
}

export default Label;
