import React, {Component, Fragment} from 'react';

const init_state = {
    index: 0,
    contexts: [],
    intent_labels: [],
    abuse_labels: [],
    current_tuple: {}
};

const label_map = {
    'doesn\'t contain': 0,
    'contains': 1
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

        this.state = {...init_state};
        this.update_contexts = this.update_contexts.bind(this);
        this.add_label = this.add_label.bind(this);
    }

    make_request = () => {
        const {contexts, intent_labels, abuse_labels} = this.state;
        const previous = contexts.length === 0? null : {intent_labels, abuse_labels};
        // this.props.make_request(previous, this.update_contexts);
    }

    update_contexts = new_contexts => this.setState({...init_state, contexts: new_contexts});

    add_label = (target_label, label) => {
        const {state} = this;
        let { current_tuple } = state;

        current_tuple[target_label] = label;

        if (Object.keys(current_tuple).length >= 2) {
            let { abuse_labels, intent_labels } = state;
            abuse_labels.push(current_tuple.abuse);
            intent_labels.push(current_tuple.intent);

            current_tuple = {};
            this.setState({ ...state, current_tuple, abuse_labels, intent_labels });
        }
        this.setState({...state, current_tuple});
    }
    

    render() {
        const {state, add_label} = this;
        const index = state.intent_labels.length;
        const context = index >= state.contexts.length? null : state.contexts[index];
        console.log(state.index, context);

        if (!context) this.make_request();

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
                    <div className='context'>{!context? 'Loading...' : context}</div>
                </div>
            </Fragment>
        )
    }
}

export default Label;
