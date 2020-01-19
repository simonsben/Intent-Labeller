import React, {Component, Fragment} from 'react';

class Label extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            contexts: props.make_request(),
            labels: []
        };
    }

    make_request = () => {
        const {labels} = this.state;
        const previous = labels == 0? null : labels;
        const new_contexts = this.props.make_request(previous);

        this.setState({...[this.state], contexts: new_contexts, labels: [], index: 0});
    }

    add_label = label => {
        const {state} = this;
        let callback = null;

        let {labels, index} = state;
        labels.push(label);
        index++;

        if (index >= state.contexts.length)
            callback = this.make_request;

        this.setState({...state, labels, index}, callback);
    }
    

    render() {
        const {state} = this;
        const context = state.index >= state.contexts.length? null : state.contexts[state.index];

        return (
            <Fragment>
                <div className='marking_window'>
                    {
                        ['negative', 'don\'t know', 'positive'].map(label => (
                            <div className='marking_label' onClick={() => this.add_label(label)} key={label}>
                                <div>{label}</div>
                            </div>
                        ))
                    }
                </div>
                <div className='container center'>
                    <div className='context'>{context}</div>
                </div>
            </Fragment>
        )
    }
}

export default Label;
